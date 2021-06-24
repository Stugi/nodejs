const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let route = require('./routes/profile.js');
let mustacheExpress = require('mustache-express');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use('/profile', route);

app.listen(80);


// app.get('/about', function (req, res) {
//   res.send('about');
// });
