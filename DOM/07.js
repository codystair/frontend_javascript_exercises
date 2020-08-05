// function nodesToArr() {
//   function getChildren(parent) {
//     debugger;
//     return [parent.tagName, Array.from(parent.children).map(getChildren)];
//   }

//   return getChildren(document.body);
// }

function nodesToArr() {
  function getChildren(element) {
    let result = [element.tagName];
    let children = Array.from(element.children);

    if (children.length === 0) {
      result.push(children);
      return result;
    }

    for(let i = 0; i < children.length; i++) {
      result.push(getChildren(children[i]));
    }

    return result;
  }

  return getChildren(document.body);
}
