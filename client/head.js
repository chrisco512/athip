import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { fonts, colors } from '../constants/styles';

export default () => (
  <header>
    <Head profile="http://www.w3.org/2005/10/profile">
      <title>HipChat FE Coding Exercise</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon"
            type="image/ico"
            href="/static/favicon.ico" />
      <link rel="stylesheet" href="/static/font-awesome/css/font-awesome.min.css" />
      <style>{`
        body {
          margin: 0;
          font-family: ${fonts.secondary};
          line-height: 1.5;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${fonts.primary};
          margin-top: 0.5em;
          margin-bottom: 0.2em;
          color: ${colors.primary};
        }

        p {
          font-size: 1.2em;
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        a {
          color: ${colors.secondary};
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </Head>
  </header>
);
