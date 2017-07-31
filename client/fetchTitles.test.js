import fetchTitles from './fetchTitles';

describe('fetchTitles', async () => {
  beforeEach(() => {
    require('superagent').__setMockResponseBody([{ title: 'Google', url: 'google.com' }]);
  });

  test('fetchTitles should call superagent', async () => {
    let response = await fetchTitles(['http://www.google.com']);
    expect(response).toEqual([{ title: 'Google', url: 'google.com' }]);
  });
})
