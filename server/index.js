const path = require('path');
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'transform-assets',
      {
        extensions: ['css', 'svg'],
        name: 'static/media/[name].[hash:8].[ext]',
      },
    ],
  ],
});
const React = require('react');
const express = require('express');

const fs = require('fs');
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';
import App from '../src/App';
const { renderToStringAsync } = require('react-async-ssr'),
  { ChunkExtractor } = require('react-lazy-ssr/server');

// Import stats file created by Webpack plugin
const stats = require('../build/reactLazySsrStats.json');

const app = express();

app.get('/*', async (req, res, next) => {
  if (
    req.url.includes('images') ||
    req.url.includes('static') ||
    req.url.includes('favicon') ||
    req.url.includes('reset.css') ||
    req.url.includes('service-worker') ||
    req.url.includes('manifest.json')
  ) {
    return next();
  }

  const indexFile = path.resolve('build/index.html');
  fs.readFile(indexFile, 'utf8', async (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    // We use SSR ONLY for cause page (to use meta data when this page is sharing). All other page use CSR
    if (!req.url.includes('/cause/'))
      return res.send(data.replace('#META#', '').replace('#CSS#', ''));

    const sheets = new ServerStyleSheets();
    const sheet = new ServerStyleSheet();

    const element = (
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    );
    // Wrap app in a ChunkExtractor
    const chunkExtractor = new ChunkExtractor({ stats });
    const app = chunkExtractor.collectChunks(element);

    const reactApp = await renderToStringAsync(sheets.collect(sheet.collectStyles(app)));

    const helmet = Helmet.renderStatic();
    const cssString = sheets.toString();
    const styleTags = sheet.getStyleTags();

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
        .replace('#META#', `${helmet.title.toString()}${helmet.meta.toString()}`)
        .replace('#CSS#', `<style id="jss-server-side">${cssString}</style>${styleTags}`),
    );
  });
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(8080, () => console.log('Express server is running on localhost:8080'));
