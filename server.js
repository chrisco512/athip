const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const asyncMiddleware = require('./utils/asyncMiddleware');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const getTitles = require('./server/getTitles');

app.prepare()
.then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post('/api/titles', asyncMiddleware(async (req, res) => {
    const urlTitles = await getTitles(req.body.urls);

    res.send(urlTitles);
  }));

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });
});
