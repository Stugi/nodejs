const fs = require('fs');

// ��������, ��� �� ������ �������� ������������� .toString(), ������� 'utf8
// � �������� ������� ��������� � readFileSync � ������� ����� ������!
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

let buffer = fs.readFileSync(process.argv[2]);
let str = buffer.toString();
console.log(str.split('\n').length-1);