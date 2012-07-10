var Functional = Functional || {}

/*
 * Linear recursion
 */
var linearRecursion = function(cond, then, before, after){
	var cond   = cond.lambda()
		, then   = then.lambda()
		, before = before.lambda()
		, after  = after.lambda();
	return function(){
		if(cond(arguments[0])){
				return then(arguments[0]);
		}
		var args = before(arguments[0]);
		var result  = arguments.callee(args);
		return after(result, arguments[0]);
	};
};

/*
 * Self call is the last operation
 */
var tailLinearRecursion = function(cond, then, before, after){
	var cond   = cond.lambda()
		, then   = then.lambda()
		, before = before.lambda()
		//, after  = after.lambda();
	return function(){
		var args = arguments;
		if(cond(args)){
				return then(args);
		}
		var args = before(args);
		return arguments.callee(args);
	};
};

/*
 * Tail recursion replacement with "for" loop
 */
var loop = function(cond, then, before, after){
	var cond   = cond.lambda()
		, then   = then.lambda()
		, before = before.lambda()
		//, after  = after.lambda();
	return function(){
		var args = arguments[0];
		while(!cond(args)){
			args = before(args);
    }
    return then(args);
  };
};

/*
 * Parallel recursion
 * Same as linear but for nodes which can be an array (former tree)
 */
var treeRecursion = function(condition, then, before, after){
  var cond   = cond.lambda()
    , then   = then.lambda()
    , before = before.lambda()
    , after  = after.lambda();
  return function(){
    debugger
    if(cond(arguments[0])){
        return then(arguments[0]);
    }
    var args = before(arguments[0])
      , result  = new Array(args.length);
    for(var i = 0; i < args.length; ++i){
        result[i] = arguments.callee(args[i]);
    }
    return after(result, arguments[0]);
  };
};

/*
 * Parallel recursion without lambdas
 *
 * @param children String name of Array container for elements inside
 * @function condition function decide wheather to process item
 * should return Boolean
 * @function process function to execute on item
 * should return item
 * @returns changed tree
 */
var processTree = function(children, condition, process){
  return function(item){
    var items = item[children];
    if(items){
      for(var i = 0; i < items.length; i++){
        items[i] = arguments.callee(items[i]);
      }
    }
    if (condition(item)){
      return process(item);
    }else{
      return(item)
    }
  };
};
