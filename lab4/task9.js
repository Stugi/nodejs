'use strict'

const http = require('http');
const [,,url1,url2,url3] = process.argv;

http.get(url1, (stream)=>{
  let a = "";
  stream.setEncoding('utf8');
  stream.on('data', data=>{a+=data;});
  stream.on('end',()=>{
    console.log(a);
    http.get(url2, (stream)=>{
      a = "";
      stream.setEncoding('utf8');
      stream.on('data', data=>{a+=data;});
      stream.on('end',()=>{
        console.log(a);
        http.get(url3, (stream)=>{
          a = "";
          stream.setEncoding('utf8');
          stream.on('data', data=>{a+=data;});
          stream.on('end',()=>{
            console.log(a);
          });
        });
      });
    });

  });
});



/*  Вам может показаться более удобным воспользоваться такими
 библиотеками, как: [async](https://npmjs.com/async) или
 [after](https://npmjs.com/after). Но в этом случае попытайтесь все сделать
 без дополнительных средств.


  'use strict'
  const http = require('http')
  const bl = require('bl')
  const results = []
  let count = 0

  function printResults () {
    for (let i = 0; i < 3; i++) {
      console.log(results[i])
    }
  }

  function httpGet (index) {
    http.get(process.argv[2 + index], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }

        results[index] = data.toString()
        count++

        if (count === 3) {
          printResults()
        }
      }))
    })
  }

  for (let i = 0; i < 3; i++) {
    httpGet(i)
  }*/
