const fs = require('fs');

// ����� ����� ������������ fs.readFile(file, 'utf8', callback)
const file = fs.readFile(process.argv[2], "utf8", function(err,data){
	if(err){}
	else{
		console.log(data.split('\n').length-1);
	}
		
});