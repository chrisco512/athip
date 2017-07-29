const getTitles = require('./getTitles');

const ctxMock = (urls) => {
  return {
    request: {
      body: {
        urls
      }
    },
    res: {},
    throw: jest.fn(),
  };
};

test('getTitles given a single url returns a collection of url/titles with one entry', async () => {
  const ctx = ctxMock(['https://www.google.com']);

  await getTitles(ctx);
  expect(ctx.body).toEqual([{ url: 'https://www.google.com', title: 'https://www.google.com/' }]);
});

test('getTitles given multiple urls returns a collection of url/titles', async () => {
  const ctx = ctxMock(['https://www.google.com', 'https://www.yahoo.com', 'https://www.facebook.com']);

  await getTitles(ctx);
  expect(ctx.body).toEqual([
    { url: 'https://www.google.com', title: 'https://www.google.com/' },
    { url: 'https://www.yahoo.com', title: 'https://www.yahoo.com/' },
    { url: 'https://www.facebook.com', title: 'https://www.facebook.com/' },
  ]);
});

test('getTitles given an empty collection returns an empty collection', async () => {
  const ctx = ctxMock([]);

  await getTitles(ctx);
  expect(ctx.body).toEqual([]);
});
