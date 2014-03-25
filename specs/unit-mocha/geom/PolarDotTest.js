var assert = require("assert");

var requirejs;

function init(asyncReturn) {
	requirejs = require("requirejs");
	requirejs.config({ baseUrl: '.', nodeRequire: require });
    requirejs(['require-config'], function(Config) {
		requirejs.config(Config);
        asyncReturn();
    });
}

describe('PolarDot', function(){

    before(function (done){
        init(done);
    });

  describe('layout', function(){
    it('returns a list of equal length', function(){
		var PolarDot = require('../../../lib/geom/PolarDot');
        var mock = Mocks().mock1();
        var layout = PolarDot.layout(mock.angular, mock.radial, mock.frame, mock.options);
		var actual = layout(mock.dataIn);
        var expected = mock.dataOut;
        assert.equal(actual.length, expected.length);
    });

    it('returns an identical list', function(done){
        var PolarDot = require('../../../lib/geom/PolarDot');
        var mock = Mocks().mock1();
        done();

        var layout = PolarDot.layout(mock.angular, mock.radial, mock.frame, mock.options);
        var actual = layout(mock.dataIn);
        var expected = mock.dataOut;
        assert.deepEqual(actual, expected);
    });
  });
});

function Mocks() {
    var Class = {};

    Class.mock1 = function() {
        var d3 = require('../d3_jsdom');
        var dataIn = [[1000, 94]];
        var dataOut = [{"rotate":-90,"radius":3,"cy":115}];
        var angular = d3.scale.linear().domain([0, 1000]).range([360, 0]);
        var radial = d3.scale.linear().domain([9, 94]).range([0, 115]);
        var frame = {"height":250,"width":250,"margin":0,"radius":115,"originTheta":0,"perimeter":1000};
        var options = {};
        return {dataIn: dataIn, frame: frame, angular: angular, radial: radial, options: options, dataOut: dataOut};
   };


    return Class;
}