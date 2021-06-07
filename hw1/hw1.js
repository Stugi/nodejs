let weights = [3,15,52,12,52];
console.log(anniguliruyEto(weights));
function anniguliruyEto(array){
	while(array.length > 1){
		array.sort((e1,e2)=>e1-e2);		
		let maxItems = array.splice(array.length-2);
		let newItem = maxItems[1]-maxItems[0];
		if(newItem > 0)
			array.push(newItem);
	}
	return (array[0])?array[0]:0;
}
