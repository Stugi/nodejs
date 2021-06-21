const http = require('http');
const fs = require('fs');

//дополнительный парраметр
//const pagename = process.argv[2] || 'ru';

//переменная среды
const locale = process.env.LANG;
const pagename = locale ==='ru_RU'?'ru':'en';

fs.readFile('./'+pagename+'.html', function (err, html) {
    if(!['en','ru'].includes(pagename)){
      throw new Error(`Not found locale ${pagename}`);
    }
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000, ()=>{
      console.log("server run in port 8000");
    });
});
