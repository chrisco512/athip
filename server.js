const Koa = require('koa');
const koaBody = require('koa-body');
const next = require('next');
const Router = require('koa-router');
const getTitles = require('./common/getTitles');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

process.on('SIGINT', function() {
  console.log('SIGINT');
  process.exit();
});

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    router.post('/api/titles', getTitles);

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(koaBody());
    server.use(router.routes());
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });
