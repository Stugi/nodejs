const express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); /*регистрируем модуль для обработки
содержимого тела post запроса в express */
app.use(express.static('public')); /* настраиваем статический сервер, для отдачи контента из папки
public */
//Формируем обработчик post запроса на адрес http://localhost:80/somepath
app.post('/somepath', (req, res, next) => {
console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
res.send(JSON.stringify(req.body)); //Отправляем присланные параметры обратно клиенту
});

app.listen(80);
