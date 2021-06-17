const fs = require('fs');

// заметьте, что вы можете избежать использования .toString(), передав 'utf8
// в качестве второго аргумента в readFileSync и получив затем строку!
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

let buffer = fs.readFileSync(process.argv[2]);
let str = buffer.toString();
console.log(str.split('\n').length-1);