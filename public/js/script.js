var $ = require('jquery');
var todos = [];

var getTodos = $.get('/api/get')

getTodos.done(function(data) {
	todos = data.reverse();
	var $ul = $('.todos');
	$ul.empty();
	todos.forEach(function(val, i, todos) {
		$('<li id="item-' + i + '" class="list-group-item line-wrap">' + val + '</li>').appendTo($ul);
	});
});

setInterval(function() {
	var getTodos = $.get('/api/get')

	getTodos.done(function(data) {
		todos = data.reverse();
		var $ul = $('.todos');
		$ul.empty();
		todos.forEach(function(val, i, todos) {
			$('<li id="item-' + i + '" class="list-group-item line-wrap">' + val + '</li>').appendTo($ul);
		});
	});
}, 3000);

$('.todo').submit(function(e) {
	e.preventDefault();
	$
	var post = $.post('/api/add', {
		text: $('#todoToAdd').val()
	});

	post.done(function(data) {
		todos = data.reverse();
		var $ul = $('.todos');
		$ul.empty();
		todos.forEach(function(val, i, todos) {
			$('<li id="item-' + i + '" class="list-group-item line-wrap">' + val + '</li>').appendTo($ul);
		});
	});
});
