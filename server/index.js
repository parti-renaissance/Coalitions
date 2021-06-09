require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "transform-assets",
      {
        "extensions": [
          "css",
          "svg"
        ],
        "name": "static/media/[name].[hash:8].[ext]"
      },
    ]
  ]
});
const React = require("react");
const express = require("express");
const path = require("path");
const fs = require("fs");
import { StaticRouter } from "react-router";
import App from '../src/App'
const {renderToStringAsync} = require('react-async-ssr'),
  {ChunkExtractor} = require('react-lazy-ssr/server');

// Import stats file created by Webpack plugin
const stats = require('../build/reactLazySsrStats.json');

const app = express();

app.get("/*", async (req, res, next) => {
  console.log(`Request URL = ${req.url}`);
  if (
    req.url.includes('images') ||
    req.url.includes('static') ||
    req.url.includes('favicon') ||
    req.url.includes('reset.css') ||
    req.url.includes('service-worker') ||
    req.url.includes('manifest.json')) {
    return next();
  }

  const element = <StaticRouter location={req.url} context={{}}><App /></StaticRouter>
  // Wrap app in a ChunkExtractor
  const chunkExtractor = new ChunkExtractor( { stats } );
  const app = chunkExtractor.collectChunks(element);

  const reactApp = await renderToStringAsync(app);

  // Get scripts
  //const scriptsHtml = chunkExtractor.getScriptTags();

  const indexFile = path.resolve("build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
