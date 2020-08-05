var links = document.querySelectorAll('a');
var articles = document.querySelectorAll('article');
var main = document.querySelector('main');

Array.from(links).forEach(link => {
  var id = link.attributes.href.value;
  var targetArticle = document.querySelector(id);
  
  link.addEventListener('click', function(event) {
    event.stopPropagation();
    main.classList.remove('highlight');
    Array.from(articles).forEach(article => {
      if (article === targetArticle) {
        article.classList.add('highlight');
      } else {
        article.classList.remove('highlight');
      }
    });
  });
});

Array.from(articles).forEach(article => {
  article.addEventListener('click', function(event) {
    event.stopPropagation();
    main.classList.remove('highlight');
    Array.from(articles).forEach(a => {
      if (article === a) {
        a.classList.add('highlight');
      } else {
        a.classList.remove('highlight');
      }
    });
  });
});

document.addEventListener('click', function(event) {
  main.classList.add('highlight');
  Array.from(articles).forEach(article => {
    article.classList.remove('highlight');
  });
});
