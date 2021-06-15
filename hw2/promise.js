const p = new Promise((resolve,reject)=>{
  //асинхронный код
  // resolve -окончена ф-ция с успехом
  setTimeout(()=>{
    console.log('Preparing data....');
    const backendData = {
      server:'aws',
      port:2000,
      status:'working'
    };
    resolve(backendData);
  }, 2000);
});

//когда вызовется resolve
/*p.then(data=>{
  console.log('Promise resolved', data);
});*/

p.then(data=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      data.modidied = true;
      resolve(data);
    },2000);
  });

  // p2.then(clientData=>{
  //   console.log('Data recievd', clientData);
  // });
})
.then(clientData=>{
  console.log('Data recievd', clientData);
  clientData.fromPromise = true;
  return clientData;
}).then(data=>{
  console.log('Modified ',data);
})
.catch(err=>console.error('Error',err))//если произошла ошибка
.finally(()=>console.log('finaly'));//
