const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const TSLintPlugin = require("tslint-webpack-plugin");

module.exports = {
  entry: ["webpack/hot/poll?100", "./lib/api_dev.ts"],
  watch: true,
  target: "node",

  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new TSLintPlugin({
      config: "./tslint.json",
      files: ["lib/**/*.ts"]
    })
  ],
  output: {
    path: path.join(__dirname, "dist-live"),
    filename: "server.js"
  }
};
