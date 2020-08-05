function delegateEvent(element, selector, eventType, callback) {
  if (!element) return undefined;

  var children = element.querySelectorAll(selector);

  element.addEventListener(eventType, event => {
    Array.from(children).forEach(child => {
      if (event.target === child) {
        callback(event);
      }
    });
  });

  return true;
}

var element1 = document.querySelector('table');
var element2 = document.querySelector('main h1');
var element3 = document.querySelector('main');

var callback = function(event) {
  alert('Target: ' + event.target.tagName + '\nCurrent Target: ' + event.currentTarget.tagName);
};

console.log(delegateEvent(element2, 'p', 'click', callback));
