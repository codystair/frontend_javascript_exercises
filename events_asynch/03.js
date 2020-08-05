function makeBold(element, func) {
  element.style.fontWeight = 'bold';

  if (func) {
    func(element);
  }
}

var sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
});
sectionElement.classList.contains('highlight');
sectionElement.style.fontWeight;
