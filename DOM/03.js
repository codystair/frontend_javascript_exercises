/*
input: number (id of an element)
output: 2d array representing DOM tree from bottom up
rules:
- first array contains input element and its siblings
- next array contains parent element and its siblings
- next array grandparents, etc.
- grandest parent will have id of '1'
- arrays will have node names

- set result to empty array
- set element to element at input id
- set parent to parent of element
- while parent's id is NOT '1'
  - set branch to array of parent's children
  - set parent to parent's parent
- return result
*/

function domTreeTracer(id) {
  var branch;
  var element = document.getElementById(id);
  var result = [];

  while (element.id) {
    branch = Array.from(element.parentNode.children).map(el => el.nodeName);
    result.push(branch);
    element = element.parentNode;
  }

  return result;
}

console.log(domTreeTracer(1));
console.log(domTreeTracer(2));
console.log(domTreeTracer(22));
