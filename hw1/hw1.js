let weights = [26565,54654,45454,12,52];
console.log(anniguliruyEto(weights));
function anniguliruyEto(array){
	while(array.length > 1){
		array.sort((e1,e2)=>e1-e2);
		let r = getRandomNullOrOne();
		let maxItems = array.splice(array.length-2);
		let newItem = maxItems[r]*(-1)+maxItems[r===0?1:0];
		if(newItem > 0)
			array.push(newItem);		
	}
	return array[0];
}

function getRandomNullOrOne(){
	return Math.floor(Math.random() * 1);
}