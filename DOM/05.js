/*
input: number representing a generation on DOM tree
output: .generation-color class added to input generation


*/

function colorGeneration(generation) {
  walk(document.body, function(node) {
    if (node.id) {
      if (getGeneration(node) === generation) {
        node.classList.add('generation-color');
      }
    }
  });
}

function getGeneration(node) {
  var count = 1;
  var parent = node.parentElement;

  while (parent.nodeName !== 'BODY') {
    count += 1;
    parent = parent.parentElement;
  }

  return count;
}

function walk(node, callback) {
  callback(node);

  for (var i = 0; i < node.children.length; i++) {
    walk(node.children[i], callback);
  }
}

// colorGeneration(1);
// colorGeneration(4);
// colorGeneration(7);
// colorGeneration(8);
// colorGeneration(3);
// colorGeneration(0);
