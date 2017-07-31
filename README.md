# FE Coding Exercise
Example app that parses chat text into structured JSON. Demo is deployed at <a href="https://at2-mhciysbdqd.now.sh/" target="_blank">https://at2-mhciysbdqd.now.sh/</a>.

## Getting Started

To run, simply clone, change into the cloned directory and then run `npm install`. Then run `npm run dev` for dev mode. The server should be accessible at `locahost:3000`.

## Parse Types

### Mentions
Mentions are a way to mention a user in the application. Mentions begin with an '@' symbol and end when hitting a non-word character.

### Emoticons
Emoticons are represented by a string of alphanumeric text, no longer than 15 characters, located inside a parenthesis.

### Links
Links are URLs contained in the chat text. Parsed URLs are sent to the server to fetch title information for that page, then returned as an array of objects containing the original URL and the page's title.

## Example Chat Text
```
@chris do you want some food from www.tacobell.com (taco)?
```

## Example Parsed JSON Output
```json
{
  "mentions": [
    "chris"
  ],
  "emoticons": [
    "taco"
  ],
  "links": [
    {
      "url": "www.tacobell.com",
      "title": "Welcome to tacobell.com! - Taco Bell"
    }
  ]
}
```
