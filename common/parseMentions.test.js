import parseMentions from './parseMentions';

test('empty chat returns an empty array', () => {
  expect(parseMentions('')).toEqual([]);
});

test('one word mention returns a single entry', () => {
  expect(parseMentions('@chris')).toEqual(['chris']);
});

test('single word mention with whitespace returns a single entry', () => {
  expect(parseMentions('  @chris')).toEqual(['chris']);
  expect(parseMentions('  @chris  ')).toEqual(['chris']);
  expect(parseMentions('@chris  ')).toEqual(['chris']);
});

test('multiple mention of same person returns a single entry', () => {
  expect(parseMentions('@chris and @chris')).toEqual(['chris']);
  expect(parseMentions('what up @chris@chris')).toEqual(['chris']);
  expect(parseMentions('   @chris @chris @chris    ')).toEqual(['chris']);
});

test('correctly parses mentions with - and _ characters', () => {
  expect(parseMentions('@chris-cordle')).toEqual(['chris-cordle']);
  expect(parseMentions('@chris_cordle')).toEqual(['chris_cordle']);
  expect(parseMentions('what up @chris-cordle_255?!!!')).toEqual(['chris-cordle_255']);
});

test('correctly parses mentions with numeric characters', () => {
  expect(parseMentions('@chrisco255')).toEqual(['chrisco255']);
});

test('stops parsing when it hits non-word characters', () => {
  expect(parseMentions('@chris')).toEqual(['chris']);
  expect(parseMentions('@chris!!')).toEqual(['chris']);
  expect(parseMentions('@chris%')).toEqual(['chris']);
  expect(parseMentions('@chris()')).toEqual(['chris']);
  expect(parseMentions('@chris*co')).toEqual(['chris']);
  expect(parseMentions('@chris}co')).toEqual(['chris']);
  expect(parseMentions('@chris,co')).toEqual(['chris']);
  expect(parseMentions('@chris/co')).toEqual(['chris']);
  expect(parseMentions('@chris"co')).toEqual(['chris']);
  expect(parseMentions('@chris\n co')).toEqual(['chris']);
  expect(parseMentions('@chris.co')).toEqual(['chris']);
});

test('parses mentions with varying cases as one', () => {
  expect(parseMentions('@chris and @Chris and @ChRiS')).toEqual(['chris']);
});

test('ignores email addresses in mentions', () => {
  expect(parseMentions('hit me up ufcordle@hotmail.com')).toEqual([]);
  expect(parseMentions('hey @chris my email is ufcordle@hotmail.com')).toEqual(['chris']);
});

test('mentions of several users parse correctly', () => {
  expect(parseMentions('what if @chris and @jon joined?')).toEqual(['chris', 'jon']);
  expect(parseMentions('@chris @jon @jill joined #channel')).toEqual(['chris', 'jon', 'jill']);
  expect(parseMentions('@chris@jon what should the output be?')).toEqual(['chris']);
  expect(parseMentions(' @chris-co and @JILL@jon-@chris')).toEqual(['chris-co', 'jill']);
});
