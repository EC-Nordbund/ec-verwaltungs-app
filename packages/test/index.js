// @ts-check
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.on('auth', function (authData) {
    if (authData === true) {
      socket.emit('auth-ok')
      socket.emit('ug', 'ug-data')
    } else {
      socket.emit('auth-fail')
    }
  });
});