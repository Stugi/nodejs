const mymodule = require('./task6_module.js');//.js не обязательно

const[,,dir,ext] = process.argv;

mymodule(dir,ext,(err,list)=>{
	if(err) throw err;
	/*Кто ж знал, что нужно построчно выводить*/
	list.forEach(e=>console.log(e));
});
