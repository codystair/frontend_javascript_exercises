let todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

const todosTemplate = Handlebars.compile($('#todos_template').html());
const confirmTemplate = Handlebars.compile($('#confirm_template').html());

$('#todos').html(todosTemplate({ todos: todoItems }));
$('#todos').on('click', 'span.remove', function(event) {
  const todoId = $(this).parent().attr('data-id');
  const todo = todoItems.filter(todo => todo.id === Number(todoId))[0];

  $('div.confirm_prompt').html(confirmTemplate(todo)).show();
});
$('div.confirm_prompt').on('click', 'a.confirm_yes', function(event) {
  event.preventDefault();

  const todoId = $(this).parent().parent().attr('data-id');
  const todo = todoItems.filter(todo => todo.id === Number(todoId))[0];
  const index = todoItems.indexOf(todo);

  todoItems.splice(index, 1);
  $('div.confirm_prompt').hide();
  $('#todos').html(todosTemplate({ todos: todoItems }));
});

$('div.confirm_prompt').on('click', 'a.confirm_no', function(event) {
  event.preventDefault();

  $('div.confirm_prompt').html('').hide();
});
