const webpack = require("webpack");

let dotenv = require("dotenv").config({ path: __dirname + "/.env" });
if (process.env.NODE_ENV !== "production") {
  dotenv.NODE_ENV = "development";
} else {
  dotenv.NODE_ENV = "production";
}

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
          crypto: require.resolve("crypto-browserify"),
          os: require.resolve("os-browserify/browser"),
          buffer: require.resolve("buffer/"),
          stream: require.resolve("stream-browserify"),
        },
      },
    },
  },
};
