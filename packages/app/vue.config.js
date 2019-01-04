module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? undefined
      : './',
  outputDir: 'dist',
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8080
  },
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(graphql|gql)$/,
  //         exclude: /node_modules/,
  //         loader: 'graphql-tag/loader'
  //       }
  //     ]
  //   },
  //   plugins: []
  // },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        // Chain webpack config for electron main process only
      },
      chainWebpackRendererProcess: config => {
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      }
    }
  }
}
