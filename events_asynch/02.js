document.querySelector('html').addEventListener('click', function(event) {
  var container = document.querySelector('#container');

  if (!container.contains(event.targer)) {
    container.style = 'display: none';
  }
});
