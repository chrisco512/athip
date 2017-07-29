const Koa = require('koa');
const koaBody = require('koa-body');
const next = require('next');
const Router = require('koa-router');
const scrape = require('html-metadata');

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

    router.post('/api/titles', async ctx => {
      const { urls } = ctx.request.body

      const metadataCollection = await Promise.all(urls.map(async url => {
        let metadata = await scrape(url);
        return { url, title: metadata.general.title };
      }));

      ctx.body = metadataCollection;
      ctx.res.statusCode = 200;
    });

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
