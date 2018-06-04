console.log(process.env.NODE_ENV)

module.exports = {
  baseUrl: process.env.NODE_ENV === 'development'?undefined:'./',
  outputDir: 'electron/src/renderer',
  runtimeCompiler: false,
  productionSourceMap: false,
  // devServer: {
  //   open: process.platform === 'darwin',
  //   disableHostCheck: false,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  //   proxy: null, // string | Object
  //   before: app => { }
  // },
}