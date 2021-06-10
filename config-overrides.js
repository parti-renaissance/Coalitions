const path = require('path');
const htmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin');
const ReactLazySsrPlugin = require('react-lazy-ssr/webpack');

module.exports = {
  webpack: function override(config, env) {
    config.plugins = config.plugins.concat([new htmlWebpackInjectAttributesPlugin({
      'data-cookieconsent': 'ignore',
    })]);

    config.plugins = config.plugins.concat([new ReactLazySsrPlugin()]);

    config.output = {
      ...config.output,
      globalObject: 'this'
    }

    const analyzeBundle = process.argv.indexOf('--analyze-bundle') !== -1;

    if (analyzeBundle) {
      const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
      config = rewireWebpackBundleAnalyzer(config, env, {
        analyzerMode: 'static',
        reportFilename: 'report.html',
      });
    }

    return config;
  },
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const defaultConfig = configFunction(proxy, allowedHost);
      return {
        ...defaultConfig,
        hot: true,
        historyApiFallback: true,
        // Allow mounting react apps from a page served by the backend.
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8000',
        },
      };
    };
  },
};
