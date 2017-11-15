var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: "./corewar/app.ts",
  output: {
      path: path.join(__dirname, 'corewar'),
      filename: "bundle.js"
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