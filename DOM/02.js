/*
1) 24
2)  3
3)  1
4)  6
5)  1
6)  2
7)  1
8)  3
9)  2
10) 1
*/

function walk(node, callback) {
  callback(node);
  
  for (var i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i], callback);
  }
}

function childNodes(id) {
  var result = [0, 0];
  var parent = document.getElementById(id);

  walk(parent, function(node) {
    if (node.parentNode === parent) {
      result[0] += 1;
    } else {
      result[1] += 1;
    }
  });

  return result;
}

for (var i = 1; i <= 10; i++) {
  console.log(childNodes(i));
}