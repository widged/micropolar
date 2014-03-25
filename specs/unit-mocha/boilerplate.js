var requirejs;

function init(asyncReturn) {
	requirejs = require("requirejs");
	requirejs.config({ baseUrl: '.', nodeRequire: require });
    requirejs(['require-config'], function(Config) {
		requirejs.config(Config);
        asyncReturn();
    });
}

describe('Mocha+requirejs', function(){
    var foo;

    before(function (done){
        init(done);
    });

  describe('loading modules as', function(){
    it('node module', function(done){
		var PolarDot = require('../../lib/geom/PolarDot');
		console.log(PolarDot);
		done();
    });
    it('bower module', function(done){
		requirejs(['../../lib/geom/PolarDot'], function(PolarDot) {
			done();
		});
    });
  });
});