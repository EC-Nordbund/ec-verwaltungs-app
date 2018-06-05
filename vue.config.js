module.exports = {
  baseUrl: process.env.NODE_ENV === 'development' ? undefined : './',
  outputDir: 'electron/src/renderer',
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8080
  }
}