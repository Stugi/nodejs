//'use strict'
const fs = require('fs');
//const path = require('path');

const[,,dir,ext] = process.argv;
fs.readdir(dir,callback);

function callback(err,list){
	if (err) return console.error(err);
	list.filter(e=>e.endsWith("."+ext)).forEach((e)=>{		
		console.log(e);
	});
}

//file://C:\Users\Arina\AppData\Roaming\npm\node_modules\learnyounode\docs-nodejs\path.html
//path.extname(file) === ext)