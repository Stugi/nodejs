let weights = [3,15,52,12,5];
console.log(anniguliruyEto(weights));
function anniguliruyEto(array){
	if(array.length <=1){
		return (array[0])?array[0]:0;
	}
	while(true){
		let max1 = array[0], 
			max2 = array[1], 
			ind1 = 0, 
			ind2 = 1;
		for(let i = 2; i<array.length; i++){			
			if(array[i]>max1){
				if (max1 > max2) {
					max2 = array[i];
					ind2 = i;
				} else {
					max1 = array[i];
					ind1 = i;
				}
			} else if(array[i]>max2){				
				max2 = array[i];
				ind2 = i;
			}
		}
		if(max2>max1){
			[max1,max2]=[max2,max1];
			[ind1,ind2]=[ind2,ind1];
		}
		if(max2===0) 
			return max1;		
		array[ind1] = max1-max2;
		array[ind2] = 0;
	}
}
