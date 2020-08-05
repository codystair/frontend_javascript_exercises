document.addEventListener('DOMContentLoaded', function() {
  var main = document.querySelector('main');
  var sub = document.getElementById('sub');

  main.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('main');
  });

  sub.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    event.stopPropagation();
    alert('sub');
  });
});
