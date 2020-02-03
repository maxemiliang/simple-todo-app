const $ = require('jquery');
let todos = [];

/**
 * fetchTodos
 * Fetches todos.
 * @returns {bool} success
 */
function fetchTodos() {
  const updateTodos = $.get('/api/get');

  updateTodos.done(function(data) {
    todos = data.reverse();
    const $ul = $('.todos');

    $ul.empty();
    todos.forEach(function(val, i, _) {
      $(
        '<li id="item-' +
          i +
          '" class="list-group-item line-wrap">' +
          val +
          '</li>'
      ).appendTo($ul);
    });
    if (todos.length === 0) {
      $('<li class="list-group-item line-wrap">Nothing here yet</li>').appendTo(
        $ul
      );
    }
  });

  return true;
}

$('.todo').submit(function(e) {
  e.preventDefault();
  const post = $.post('/api/add', {
    text: $('#todoToAdd').val()
  });

  post.done(function(data) {
    todos = data.reverse();
    const $ul = $('.todos');

    $ul.empty();
    todos.forEach(function(val, i, _) {
      $(
        '<li id="item-' +
          i +
          '" class="list-group-item line-wrap">' +
          val +
          '</li>'
      ).appendTo($ul);
    });
  });
});

setInterval(fetchTodos, 3000);
fetchTodos();
