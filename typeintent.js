TypeIntent = function(params){
	var delay = 0;
	var time = 0;
	var prevVal;
	return function(){
		if (this.value != prevVal){
			delay = clearTimeout(delay);
			delay = setTimeout(params.handler, Math.min(Date.now() - time + (params.grace || 150), params.maxWait || 800));
			time = Date.now();
			prevVal = this.value;
		}
	}
}

// Event binding utility
TypeIntent.on = function(elem, params){
	if (document.addEventListener){
		elem.addEventListener("keyup", TypeIntent(params), false);
	} else if (document.attachEvent){
		elem.attachEvent("onkeyup", TypeIntent(params));
	} else {
		var old = typeof elem.onkeyup == 'function' ? elem.onkeyup : function(){};
		var ti = TypeIntent(params);
		elem.onkeyup = function(){
			old.call(this);
			ti.call(this);
		}
	}
}

// As jQuery plugin
if (window.jQuery){
	window.jQuery.fn.typeIntent = function(params){
		jQuery(this).keyup(TypeIntent(params));
	}
}
