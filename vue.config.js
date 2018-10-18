const { BannerPlugin } = require('webpack')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

let toYear = new Date()
  .getFullYear()
  .toString()
  .split('')
  .slice(2)
  .join('')

module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? undefined
      : './',
  outputDir: 'electron/src/renderer',
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8080
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    },
    plugins: []
  }
}
