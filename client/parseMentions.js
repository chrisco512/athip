import { uniq } from 'lodash';

function parseMentions(chat) {
  let mentions = chat.match(/\B\@\w+/gim);

  if(mentions) {
    return uniq(mentions.map(mention => mention.toLowerCase().substr(1)));
  }

  return [];
}

export default parseMentions;
