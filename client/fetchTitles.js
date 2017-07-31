import request from 'superagent';

export default async function fetchTitles(urls) {
  let response;

  try {
    response = await request
      .post('http://localhost:3000/api/titles')
      .send({ urls })
      .set('Accept', 'application/json');
  } catch (err) {
    console.log('Error: ', err);
    return [];
  }

  return response.body;
}
