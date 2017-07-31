const URI = require('urijs');
const scrape = require('html-metadata');

async function getTitles(urls) {
  let metadataCollection;

  try {
    metadataCollection = await Promise.all(urls.map(async url => {
      let uri = new URI(url);
      if(!uri.protocol()) { uri.protocol('http') }

      let metadata = await scrape(uri.toString());
      return { url, title: metadata.general.title };
    }));
  } catch(err) {
    throw new Error('Bad URL request body format. Body must contain a url key with an array of valid URI strings.');
  }

  return metadataCollection;
}

module.exports = getTitles;
