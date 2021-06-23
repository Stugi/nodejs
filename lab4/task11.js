const http = require('http');
const fs = require('fs');

// console.log(process.argv[2],process.argv[3]);

let server = http.createServer((req,res)=>{
  res.writeHead(200, { 'Content-type': 'text/plain' })
  fs.createReadStream(process.argv[3]).pipe(res);

});
server.listen(Number(process.argv[2]));

  //console.log(process.argv[3], process.argv[2]);

//  file://C:\Users\Arina\AppData\Roaming\npm\node_modules\learnyounode\docs-n odejs\http.html
