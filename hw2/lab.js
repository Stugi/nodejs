const http = require('http');
const fs = require('fs');
// node --inspect index.js
const server = http.createServer((req, res)=>{

Promise.all([readFile('header.html'), readFile('body.html'), readFile('footer.html')])
  .then((data)=>{
    console.log(data[0]);
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    res.end(data.join(''));
  }).catch(err=>{
    //console.error('Error',err)
    res.statusCode = 500;
    res.end(err);
  });
});

const readFile = filename =>{
  return new Promise(
      (resolve,reject)=>{
        fs.readFile('./'+filename,'utf-8',(err,result)=>{
             if(err) {
               reject(err);
             }
              resolve(result);
           })
      }
  );
}


server.listen(8081, ()=>{
	console.log('Server run in 8081 port\n' +
		'http://localhost:8081');
});
