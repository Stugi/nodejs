const express = require('express');
let router = express.Router();

let mustacheExpress = require('mustache-express');


router.post('/', (req, res, next)=>{
  //Выводим параметры из маршрута
  let b = new Object(req.body);
  res.render('index', { login: b.login ,
                        pass:  b.passw});
});
//Экспортируем роутер из модуля
module.exports = router;
