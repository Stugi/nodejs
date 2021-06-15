//sleep
const sleep = ms =>{
  return new Promise(
      resolve=>{
        setTimeout(()=>{
          console.log('tut',ms);
          resolve(ms), ms});
      }
  );
}

// sleep(2000).then(()=>console.log('after 2 seconds'));
// sleep(3000).then(()=>console.log('after 3 seconds'));

//когда выполнятся все промиссы, возвращают data в порядке запроса
Promise.all([sleep(5000), sleep(2000)]).then((data)=>{
  console.log("Выполнились все промиссы", data)
});

Promise.race([sleep(2000), sleep(5000)]).then((d)=>{
  // // Выполнится 2 , but вернется который быстрее
  console.log("Один промиссы",d)
});
