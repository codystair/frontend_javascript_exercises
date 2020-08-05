/*
input: 2 numbers: start index and end index (ids)
output: array of tag names from start to end
rules:
- array includes end id
- only consider element nodes
- return undefined if id doesn't exist
- return undefined if there's no path from start to end

- set endTag as element with childId
- if endTag is falsey, return undefined
- set result to empty array
- 
*/

function sliceTree(startId, endId) {
  var current = document.getElementById(endId);
  var top = document.getElementById(startId);
  var result = [];

  if (!current) {
    return undefined;
  }

  while (current.id !== top.id) {
    result.unshift(current.nodeName);
    current = current.parentElement;
    if (!current.id) return undefined;
  }

  result.unshift(current.nodeName);
  return result;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 2));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
