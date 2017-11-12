module.exports = {
  devtool: 'inline-source-map',
  entry: "./corewar/app.ts",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
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