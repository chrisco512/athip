const getTitles = require('./getTitles');

test('getTitles given a single url returns a collection of url/titles with one entry', async () => {
  const urls = ['https://www.google.com'];

  const titles = await getTitles(urls);
  expect(titles).toEqual([{ url: 'https://www.google.com', title: 'https://www.google.com/' }]);
});

test('getTitles given multiple urls returns a collection of url/titles', async () => {
  const urls = ['https://www.google.com', 'https://www.yahoo.com', 'https://www.facebook.com'];

  const titles = await getTitles(urls);
  expect(titles).toEqual([
    { url: 'https://www.google.com', title: 'https://www.google.com/' },
    { url: 'https://www.yahoo.com', title: 'https://www.yahoo.com/' },
    { url: 'https://www.facebook.com', title: 'https://www.facebook.com/' },
  ]);
});

test('getTitles given an empty collection returns an empty collection', async () => {
  const urls = [];

  const titles = await getTitles(urls);
  expect(titles).toEqual([]);
});
