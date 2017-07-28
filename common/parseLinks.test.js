import parseLinks from './parseLinks';
import URI from 'urijs';

test('empty chat returns an empty array', () => {
  expect(parseLinks('')).toEqual([]);
});

test('testing parseLink', () => {
  var source = "Hello www.example.com,\n"
    + "http://google.com is a search engine, like http://www.bing.com\n"
    + "http://exämple.org/foo.html?baz=la#bumm is an IDN URL,\n"
    + "http://123.123.123.123/foo.html is IPv4 and "
    + "http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/foobar.html is IPv6.\n"
    + "links can also be in parens (http://example.org) "
    + "or quotes »http://example.org«.";

  expect(parseLinks(source)).toEqual([
    'www.example.com',
    'http://google.com/',
    'http://www.bing.com/',
    'http://xn--exmple-cua.org/foo.html?baz=la#bumm',
    'http://123.123.123.123/foo.html',
    'http://[fe80::204:61ff:fe9d:f156]/foobar.html',
    'http://example.org/',
    'http://example.org/'
  ]);
});
