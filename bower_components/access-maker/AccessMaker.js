define([], function(){
	var Class = {};


  // getSet public variables, the curry way.
	Class.accessMaker = function(state, instance) {
		return {
			getSet: function(attr, aroundFns) {
					return function(_) {
						if(!arguments.length) { return state[attr]; }
						if(_ !== state[attr]) {
							(aroundFns || []).forEach(function(fn) {
								fn(_, function(new_) { _ = new_; });
							});
							state[attr] = _;
						}
						return instance;
				};
			}
		};
	};

	Class.allKeys = function(state,  instance, aroundFns, changeFn) {
		Object.keys(state).forEach(function(key) {
			instance[key] = function(_) {
				if(!arguments.length) { return state[key]; }
				if(_ === state[key]) {  return instance; }
				(aroundFns || []).forEach(function(fn) {
					_ = fn(key, _);
				});
				state[key] = _;
				if(changeFn) { changeFn(key, _); }
				return instance;
			};
		});

	};


	Class.addConfig = function(state,  instance) {
		instance.config = function(_x) {
			if (!arguments.length) return state;
			Object.keys(_x || {}).forEach(function(key) {
				if(!instance[key]) { console.log('[unknown key]', key); return; }
				instance[key](_x[key]);
			});

			return instance;
		};
	};

	
	Class.name = "accessmaker"; // required to get define works outside of requirejs
	return Class;



});
