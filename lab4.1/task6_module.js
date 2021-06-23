const fs = require('fs');
const path = require('path');

function readDir(dir,ext,callback){
	fs.readdir(dir,(err,list)=>{
		if (err) return callback(err);
		let l = list.filter(e=>{ return path.extname(e) === "."+ext});
		return callback(null, l);
})}

module.exports = readDir;



