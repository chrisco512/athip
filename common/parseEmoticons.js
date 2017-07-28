// @flow
import { uniq } from 'lodash';

function parseEmoticons(chat: string) {
  let emoticons = chat.match(/\(([A-Za-z0-9]{1,15})\)/gim);

  if(emoticons) {
    return uniq(emoticons.map(emoticon => emoticon.toLowerCase().substr(1, emoticon.length - 2)));
  }

  return [];
}

export default parseEmoticons;
