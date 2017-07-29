import parseChat from './parseChat';

describe('parseChat', async () => {
  beforeEach(() => {
    require('superagent').__setMockResponseBody([{ title: 'Google', url: 'www.google.com' }]);
  });

  test('empty string returns object with default fields and empty arrays', async () => {
    const parsedChat = await parseChat('');

    expect(parsedChat).toEqual({
      mentions: [],
      emoticons: [],
      links: []
    });
  });

  test('chat with mentions should parse mentions', async () => {
    const parsedChat = await parseChat('@chris should talk to @john');

    expect(parsedChat).toEqual({
      mentions: ['chris', 'john'],
      emoticons: [],
      links: []
    });
  });

  test('chat with emoticons should parse emoticons', async () => {
    const parsedChat = await parseChat('(megusta) tacos');

    expect(parsedChat).toEqual({
      mentions: [],
      emoticons: ['megusta'],
      links: []
    });
  });

  test('chat with links should parse into link/title objects', async () => {
    const parsedChat = await parseChat('I hear www.google.com is a good search engine');

    expect(parsedChat).toEqual({
      mentions: [],
      emoticons: [],
      links: [{ url: 'www.google.com', title: 'Google' }]
    });
  });
});
