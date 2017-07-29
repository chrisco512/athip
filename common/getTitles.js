const scrape = require('html-metadata');

async function getTitles(ctx) {
  const { urls } = ctx.request.body

  const metadataCollection = await Promise.all(urls.map(async url => {
    let metadata = await scrape(url);
    return { url, title: metadata.general.title };
  }));

  ctx.body = metadataCollection;
  ctx.res.statusCode = 200;
}

module.exports = getTitles;
