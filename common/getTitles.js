const URI = require('urijs');
const scrape = require('html-metadata');

async function getTitles(ctx) {
  const { urls } = ctx.request.body
  let metadataCollection;

  try {
    metadataCollection = await Promise.all(urls.map(async url => {
      let uri = new URI(url);
      if(!uri.protocol()) { uri.protocol('http') }

      let metadata = await scrape(uri.toString());
      return { url, title: metadata.general.title };
    }));
  } catch(err) {
    ctx.throw(400, 'Bad URL request body format. Body must contain a url key with an array of valid URI strings.');
  }

  ctx.body = metadataCollection;
  ctx.res.statusCode = 200;
}

module.exports = getTitles;
