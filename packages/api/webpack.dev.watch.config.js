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
      // {
      //   test: /\.ts$/,
      //   enforce: "pre",
      //   use: [
      //     {
      //       loader: "tslint-loader",
      //       options: {}
      //     }
      //   ]
      // },
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
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
      files: ["./src/**/*.ts"]
    })
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "serverDev.js"
  }
};
