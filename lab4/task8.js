// const bl = require('bl');

const http = require('http');

http.get(process.argv[2],(stream)=>{
  let a = "";
  stream.setEncoding('utf8');
  stream.on('data', data=>{a+=data;});
  stream.on('end',()=>{
    console.log(a.length);
    console.log(a);
  });
});



/*'use strict'
 const http = require('http')
 const bl = require('bl')

 http.get(process.argv[2], function (response) {
   response.pipe(bl(function (err, data) {
     if (err) {
       return console.error(err)
     }
     data = data.toString()
     console.log(data.length)
     console.log(data)
   }))
 })
*/
