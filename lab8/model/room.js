const rooms = [];

function setRoom(user){
  let index = rooms.findIndex(e=>{
    return !(e.user1)||!(e.user2);
  });
  if(index>=0){
    if(rooms[index].user1)
      rooms[index].user2 = user;
    else
      rooms[index].user1 = user;
    return rooms[index];
  }else{
    return createRoom(user);
  }

}

function createRoom(user){

  const room = { name: "room#"+id(),
               user1: user,
               move:0,
               moves:[]
             }

  rooms.push(room);

  return room;
}

function findRoom(idUser){
  return rooms.find(room => (room.user1 && room.user1.id === idUser)||(room.user2 && room.user2.id === idUser));
}

function id(){
  if(rooms.length===0)return 0;
  return Math.max(...rooms.map(e=>e.name.split('#')[1]))+1;
}

function userLeaveRoom(id) {
  const room = findRoom(id);
  if(room.user1 && room.user1.id===id)
    delete room.user1;
  else
   delete room.user2;
   return room;
}

function checkMove(id,item) {
  const room = findRoom(id);
  if(!room.user1 || !room.user2)
    return null;
  if(room.moves.findIndex(m=>m["item"]===item)>=0)
    return null;
  if(room.user1.id === id && (room.move%2===0)){
    return fabricAnswer(room, item, "X");
  } else if(room.user2.id === id && room.move%2===1){
    return fabricAnswer(room, item, "0");
  }
}

function fabricAnswer(room, item, symbol){

  addMove(room,item,symbol);
  room.move+=1;
  let win = checkWin(room,symbol);

  return {"room":room, symbol:symbol, win:win};
}

const wincomby = [
                  [0,1,2],[3,4,5],[6,7,8],
                  [0,3,6],[1,4,7],[2,5,8],
                  [0,4,8],[2,4,6]
                    ];
function checkWin(room,s){
  if(room.move===9)
    return `Ничья`;
  let res = room.moves.filter(e=>e.symbol === s).map(n=>n.item);

  for (let w = 0; w < wincomby.length; w++) {
    let win = wincomby[w];
    let iswin = win.every(e=>res.includes(e));
    if(iswin)
      return `Победили ${s}`;
  }
 return null;
}

function addMove(room,item,symbol){
     const move = {item:+item,symbol} ;
    room.moves.push(move);
}

module.exports = {
  findRoom,setRoom,userLeaveRoom,checkMove
};
