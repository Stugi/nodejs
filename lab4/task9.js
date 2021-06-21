'use strict'

const http = require('http');

const getContent = url=>{http.get(url, (res)=>{
  let a = "";
  stream.setEncoding('utf8');
  stream.on('data', data=>{a+=data;});
  stream.on('end',()=>{
    return a;
  });
})};


let urls = process.argv.slice(2)
console.log(urls,getContent);
urls.forEach(e => {
  getContent(e).then(
    data=>{
      console.log(data);
    }
  );
});



/*  Вам может показаться более удобным воспользоваться такими
 библиотеками, как: [async](https://npmjs.com/async) или
 [after](https://npmjs.com/after). Но в этом случае попытайтесь все сделать
 без дополнительных средств.*/
