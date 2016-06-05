var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var app = express();

var todos = [];
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/get', (req, res) => {
  res.send(todos);
});

app.post('/api/add', (req, res) => {
  todos.push(req.body.text);
  res.send(todos);
});

app.listen(process.env.PORT || 1337, (err) => {
  if (err) throw err;
  console.log("Server running!")
});
