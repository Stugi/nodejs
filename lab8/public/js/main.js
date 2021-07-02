const socket = io();

const fields = document.getElementById("fields");


const username = getParameterByName("username");
// const room = getParameterByName("room");

socket.on('message', message => {
  console.log(message);
});

socket.on("roomUsers", ({
  room,
  user1,
  user2
}) => {
  outPutById("room", room);
  outPutById("us1", user1.symbol + " " + user1.name);
  outPutById("us2", user2.symbol + " " + user2.name);
});

socket.on("gameStart", () => {

  let field = generateField();

  field.addEventListener("click", e => {

    let item = e.target.dataset.id;
    console.log(e.target.dataset);
    socket.emit('clickOnItem', item)
  });
  document.getElementById("main").innerHTML = "";
  document.getElementById("main").append(
    field
  );
});

socket.emit("joinRoom", {
  username
});

socket.on('updateItem', ({item,symbol}) => {
  updateFields(item,symbol);
});

socket.on('updateStatus', (status) => {
  showStatus(status);
});

function updateFields(data,symbol) {
  const field = document.getElementById("field");

  for (let variable of field.children) {
    if (variable.dataset.id == data) {
      variable.firstElementChild.innerText = symbol;
    }
  }
}
function showStatus(str) {
  const field = document.getElementById("main");
  field.innerHTML = `<p>${str}</p>`;
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function outPutById(id, text) {
  document.getElementById(id).innerText = text;
}

function generateField(n = 3) {
  let field = document.createElement("div");
  field.style.cssText =
    "margin: 0 auto;" + //'элемент поцентру'
    "width: 25vw;" +
    "display: flex;" +
    "flex-wrap: wrap;";
  field.setAttribute("id","field");
  // создание одной ячейки
  // n*n - общее количество ячеек
  for (let i = 0; i < n * n; i++) {
    let celldiv = document.createElement("div");
    let cell = document.createElement("div");
    // cell.style.border = "1px solid black";
    celldiv.style.width = celldiv.style.height  =25 / n + "vw";
    celldiv.style.boxSizing = "border-box";
    celldiv.style.display = "flex";
    celldiv.style.fontSize = 12 / n + "vw";
    celldiv.style.textAlign = "center";

    celldiv.dataset.id = i;
    cell.classList.add("item");
    celldiv.append(cell);
    field.append(celldiv);
  }
  return field;
}
