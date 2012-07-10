var factorial1 = linrec("<= 1", "1", "n - 1", "m * n");
var factorial2 = tailrec("n[0]<= 1", "n[1]", "[n[0] - 1, n[0] * n[1]]");
var factorial3 = loop("n[0]<= 1", "n[1]", "[n[0] - 1, n[0] * n[1]]");
var factorial4 = multirec("<= 0", "1", "[n - 1]", "a[0] * b");

/*
* Item should implement the following:
* items - Array - container for elements inside
*/
var processTreeLeaves= function(processLeaf){
  return function(item){
    if(item.items){
      var items = item.items;
      for(var i = 0; i < items.length; i++){
        items[i] = arguments.callee(items[i]);
      }
    }else{
      return processLeaf(item);
    }
    return(item)
  };
};

var tree = {
  name: 'Root',
  button: true,
  items: [
    1,
    {
      name: "Branch",
      button: true,
      items: [1]
    }
  ]
}

var leafIncrement = processTreeLeaves(function(leaf){return ++leaf});
var incrementedTree = leafIncrement(tree);

var condition = function(item){
  return item.button;
}
var process = function(item){
  var items = item.items || [];
  items.push(3);
  item.items = items;
  return item;
}
var growTree = processTree("items", condition, process)
var newTree = growTree(tree);
