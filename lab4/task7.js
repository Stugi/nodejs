'use strict'
const http = require('http');
// file://C:\Users\Arina\AppData\Roaming\npm\node_modules\learnyounode\docs-nodejs\http.html
http.get(process.argv[2], callback);

function callback(response){
  response.setEncoding('UTF8');
  response.on('data',data=>{console.log(data);});
}
