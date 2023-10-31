const webpack = require("webpack");

module.exports = {
    // ...
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    path: require.resolve("path-browserify"),
                    crypto: require.resolve("crypto-browserify"),
                    os: require.resolve("os-browserify/browser"),
                    buffer: require.resolve("buffer/"),
                    stream: require.resolve("stream-browserify")
                },
            },
        },
        plugins: {
            add: [ 
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                })
             ],
        },
    },
  };