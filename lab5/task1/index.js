let express = require('express'); //подключаем модуль express
let app = express(); //создаем приложение express
let route = require('./routes/products.js'); //подключаем файл с роутом
/*регистрируем роут, все url начинающиеся с /products будут передаваться в обработку в этот роут*/
app.use('/products', route);

//Настраиваем express приложение слушать запросы на 3000 порту
app.listen(3000);
