import parseEmoticons from './parseEmoticons';

test('empty chat returns an empty array', () => {
  expect(parseEmoticons('')).toEqual([]);
});

test('correctly parses alphanumeric strings with single emoticon', () => {
  expect(parseEmoticons('(megusta)')).toEqual(['megusta']);
  expect(parseEmoticons('(a)')).toEqual(['a']);
  expect(parseEmoticons('(abcdefghijklmno)')).toEqual(['abcdefghijklmno']);
  expect(parseEmoticons('hello (world)')).toEqual(['world']);
  expect(parseEmoticons('(hello) world')).toEqual(['hello']);
  expect(parseEmoticons('(hello123) world')).toEqual(['hello123']);
});

test('empty parentheses returns empty array', () => {
  expect(parseEmoticons('()')).toEqual([]);
});

test('ignores parentheses which contain non-alphanumeric characters', () => {
  expect(parseEmoticons('(a b)')).toEqual([]);
  expect(parseEmoticons('(_abc)')).toEqual([]);
  expect(parseEmoticons('($abc)')).toEqual([]);
  expect(parseEmoticons('(@chris)')).toEqual([]);
  expect(parseEmoticons('()')).toEqual([]);
});

test('emoticon parser should be case insensitive', () => {
  expect(parseEmoticons('(hello) world (HELLO)')).toEqual(['hello']);
  expect(parseEmoticons('(hello123) world (HELLO123)')).toEqual(['hello123']);
});

test('should ignore emoticons greather than 15 characters', () => {
  expect(parseEmoticons('abcdefghijklmnop')).toEqual([]);
});

test('correctly parses multiple emoticons in a sentence', () => {
  expect(parseEmoticons('(hello) (world)')).toEqual(['hello', 'world']);
  expect(parseEmoticons('(hello)(world)')).toEqual(['hello', 'world']);
  expect(parseEmoticons('  (hello) (world)  ')).toEqual(['hello', 'world']);
  expect(parseEmoticons('(hello) welcome to the (world)')).toEqual(['hello', 'world']);
  expect(parseEmoticons('(hello) welcome to the(world)')).toEqual(['hello', 'world']);
  expect(parseEmoticons('(megusta) (hello) (world)')).toEqual(['megusta', 'hello', 'world']);
});
