// Set Dev-Mode
process.env.NODE_ENV = 'development'

require('electron').app.once('ready', () => {
  // Check Installer
  let installExtension = require('electron-devtools-installer')

  //Install VueJSDevtools
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log(
        'Unable to install `vue-devtools`: \n',
        err
      )
    })

  //Install ApolloDevtools
  installExtension
    .default(installExtension.APOLLO_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      console.log(
        'Unable to install `apollo-devtools`: \n',
        err
      )
    })
})

// Import Main.js für Setup
require('./main.js')
