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
  configureWebpack: {
    devtool: 'source-map'
  },
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
      },
      builderOptions: {
        appID: 'de.ec-nordbund.app',
        productName: 'EC-Verwaltungs-App',
        copyright: "Copyright © 2019 S.Krüger + T.Krause für den EC-Nordbund",
        linux: {
          // icon: '',
          // synopsis : 'kurzbeschreibung',

        },
        appImage: {},
        win: {},
        nsis: {},
        mac: {},
        dmg: {}
      }
    }
  }
}
