function arrayToNodes(nodes) {
  let parent = document.createElement(nodes[0]);
  let children = nodes[1];
  let element;

  if (children.length === 0) {
    return parent;
  }

  for (let i = 0; i < children.length; i++) {
    parent.appendChild(arrayToNodes(children[i]));
  }

  return parent;
}
