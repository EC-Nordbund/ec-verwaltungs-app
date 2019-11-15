// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  chainWebpack: config => config.optimization.minimize(true),
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new WebpackShellPlugin({onBuildExit: ["node a.js ./dist/ecForm.umd.min.js ../app/src/assets/ecForm.umd.min.js"]})
    ]
  }
}

