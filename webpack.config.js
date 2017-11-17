var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: "./index.ts",
  output: {
      path: path.join(__dirname, 'dist'),
      filename: "index.js",
      library: "corewar",
      libraryTarget: 'umd',
      umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      loaders: [
          { test: /\.css$/, loader: "style!css" }
      ],
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
  }
};