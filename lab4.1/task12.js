'use strict'

const http = require('http');
const map = require('through2-map');

let server = http.createServer((req,res)=>{
  if(req.method === "POST"){
    req.pipe(map(ch=>toUpperCase(ch.toString()))).pipe(res);
  } else {
    res.end('need POST');
  }
});
server.listen(Number(process.argv[2]));

function toUpperCase(str){
  return str.toUpperCase();
}
// Библиотека through2-map предоставляет
// самое простое API для данной задачи.
