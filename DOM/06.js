function isValidSwap(id1, id2) {
  var el1 = document.getElementById(id1);
  var el2 = document.getElementById(id2);

  if (!el1 || !el2) return undefined;

  if (Array.from(el1.children).includes(el2)) {
    return undefined;
  }

  if (Array.from(el2.children).includes(el1)) {
    return undefined;
  }

  return true;
}

function nodeSwap(id1, id2) {
  if (!isValidSwap(id1, id2)) return undefined;

  var el1 = document.getElementById(id1);
  var el1Copy = el1.cloneNode(true);
  var el2 = document.getElementById(id2);
  var el2Copy = el2.cloneNode(true);
  var parent = el1.parentNode;

  parent.replaceChild(el2Copy, el1);
  parent.replaceChild(el1Copy, el2);
  return true;
}
