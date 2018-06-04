process.env.NODE_ENV = 'development'
require('electron-debug')({ showDevTools: true })

require('./main.js')