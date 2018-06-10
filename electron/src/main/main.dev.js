process.env.NODE_ENV = 'development';

require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log(
        'Unable to install `vue-devtools`: \n',
        err
      );
    });
  installExtension
    .default(installExtension.APOLLO_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      console.log(
        'Unable to install `apollo-devtools`: \n',
        err
      );
    });
});

require('./main.js');
