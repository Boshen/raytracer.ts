const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: [
    "./src/main",
    'webpack-dev-server/client?http://localhost:8000/'
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 8000
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: 'http://localhost:8000/',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          /node_modules/
        ],
      },
    ],
  },

  resolve: {
    extensions: [
      ".js",
      ".ts"
    ],
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src")
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],

  performance: {
    hints: false,
  },

  target: 'web',

}
