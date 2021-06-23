'use strict'

let port = process.argv[2]
const net = require('net');
var strftime = require('strftime');
const server = net.createServer(callback);
server.listen(port);

function callback (socket) {
  // socket.write();
  socket.write(strftime('%F %H:%M',new Date(Date.now())));
  socket.end('\n');
}

// file://C:\Users\Arina\AppData\Roaming\npm\node_modules\learnyounode\docs-nodejs\net.html
