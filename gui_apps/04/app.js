let todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

const App = {
  todosTemplate: Handlebars.compile($('#todos_template').html()),
  confirmTemplate: Handlebars.compile($('#confirm_template').html()),
  contextMenuTemplate: Handlebars.compile($('#context_menu_template').html()),
  $todos: $('#todos'),
  $contextMenu: $('div.context_menu'),
  $confirmPrompt: $('div.confirm_prompt'),

  renderTodos: function() {
    this.$todos.html(this.todosTemplate({ todos: todoItems }));
  },

  displayContextMenu: function(event) {
    event.preventDefault();
    const todoId = $(event.target).attr('data-id');
    const todo = todoItems.filter(todo => todo.id === Number(todoId))[0];

    this.$contextMenu.html(this.contextMenuTemplate(todo)).show();
    this.$contextMenu.offset({ left: event.clientX, top: event.clientY });
  },

  displayConfirmPrompt: function(event) {
    const todoId = $(event.target).attr('data-id');
    const todo = todoItems.filter(todo => todo.id === Number(todoId))[0];

    this.hideContextMenu();
    this.$confirmPrompt.html(this.confirmTemplate(todo)).show();
  },

  hideContextMenu: function() {
    this.$contextMenu.hide();
  },

  hideConfirmPrompt: function() {
    this.$confirmPrompt.hide();
  },

  deleteTodo: function(event) {
    event.preventDefault();

    const todoId = $(event.target).parent().parent().attr('data-id');
    const todo = todoItems.filter(todo => todo.id === Number(todoId))[0];
    const index = todoItems.indexOf(todo);

    todoItems.splice(index, 1);
    this.hideConfirmPrompt();
    this.renderTodos();
  },

  init: function() {
    this.renderTodos();
    this.$todos.html(this.todosTemplate({ todos: todoItems }));
    this.$todos.on('contextmenu', 'li', this.displayContextMenu.bind(this));
    this.$contextMenu.on('click', 'li.remove', this.displayConfirmPrompt.bind(this));
    this.$confirmPrompt.on('click', 'a.confirm_yes', this.deleteTodo.bind(this));
    this.$confirmPrompt.on('click', 'a.confirm_no', this.hideConfirmPrompt.bind(this));
    $('body').on('click', this.hideContextMenu.bind(this));
  }
};

App.init();
