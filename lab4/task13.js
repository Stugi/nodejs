const http = require('http');
const iso = "/api/parsetime",
      unix = "/api/unixtime"
let server = http.createServer((req,res)=>{
  if(req.method==="GET"){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(req.url);
    let url = new URL(req.url, "http://localhost:"+process.argv[2]+"/");
    // console.log(url);
    // console.log(parseUrl(url));
    res.end(JSON.stringify(parseUrl(url)));
  }
});

server.listen(Number(process.argv[2]));


function parseUrl({search, pathname}){
  // console.log(search,"dddddd",pathname,search.split("=")[1]);
  let d =  new Date(search.split("=")[1]);
  switch(pathname){
    case iso:
    return { "hour": d.getHours(), "minute": d.getMinutes(), "second": d.getSeconds()};
    case unix:
    return { "unixtime": d.getTime()};
  }
}
