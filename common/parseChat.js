// @flow
import parseMentions from './parseMentions';
import parseEmoticons from './parseEmoticons';
import parseLinks from './parseLinks';
import fetchTitles from './fetchTitles';

async function parseChat(chat: string) {
  const mentions = parseMentions(chat);
  const emoticons = parseEmoticons(chat);
  const links = parseLinks(chat);

  let linkTitles = [];

  try {
    if(links.length) {
      linkTitles = await fetchTitles(links);
    }
  } catch (err) {
    console.log('Error parsing & fetching link titles', err);
  }

  return {
    mentions,
    emoticons,
    links: linkTitles
  }
}

export default parseChat;
