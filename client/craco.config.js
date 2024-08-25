const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/")
      };
      return webpackConfig;
    }
  }
};
