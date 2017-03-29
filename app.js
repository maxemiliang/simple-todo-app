var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var expressValidator = require('express-validator');
var helmet = require('helmet');
var app = express();
var redis = require('redis');
var limiter = require('express-limiter')(app, client)

var host = process.env.REDIS_URL || '127.0.0.1';
var port = 6379;

var client = redis.createClient('6379', 'db');

limiter({
	path: '/api/add',
	method: 'post',
	lookup: ['connection.remoteAddress'],
	// 100 requests per 10 mins
	total: 100,
	expire: 600000
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/api/get', (req, res) => {
	client.lrange('todos', 0, -1, (err, reply) => {
		if (err) throw err;
		res.send(reply);
	});
});

app.post('/api/add', (req, res) => {
	req.checkBody('text', 'Text is empty').notEmpty();
	error = req.validationErrors();
	if (!error) {
		req.sanitize('text').escape().trim();
		client.rpush(['todos', req.body.text], (err, reply) => {
			if (err) throw err;
		});
		client.lrange('todos', 0, -1, function(err, reply) {
			res.send(reply);
		});
	} else {
		res.sendStatus(400);
	}
});

app.listen(process.env.PORT || 1337, (err) => {
	if (err) throw err;
	console.log("Server running!");
});
