module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? undefined
      : './',
  outputDir: 'electron/src/renderer',
  runtimeCompiler: true,
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
