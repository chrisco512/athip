import URI from 'urijs';

function parseLinks(chat) {
  const urls = [];

  URI.withinString(chat, function(url) {
    urls.push(URI(url).normalize().toString());
  });

  return urls;
}

export default parseLinks;
