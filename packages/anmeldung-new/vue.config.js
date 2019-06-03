const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
}