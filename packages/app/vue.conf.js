module.exports = {
  // productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('define')
        .tap(args => {
          let v = JSON.stringify(require('./package.json').version)
          args[0]['process.env']['VERSION'] = v
          return args
        })
  }
}