define(['d3', 'accessmaker', 'polarplot', 'polarhover', 'polarline'], function(d3, AccessMaker, PolarPlot, PolarHover, LineGeom) {

    var FN = {};
    var Class = function PolarMultiline() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0},
        angular: {domain: [0, 360], range: null, ticks: {perimeter: 360, majorStep: 30, majorSuffix: 'º' } },
        radial: {domain : [0, 1], range: null, ticks: {showCircle: true, axisTheta: -30} }
    };


    Class.deriveSerieData = function(_serie, _step) {
        var step = _step || 6;
        var fn = _serie.fn;
        _serie.data = d3.range(0, 360 + step, step).map(function(deg, index) {
            var theta = deg * Math.PI / 180;
            var radius = fn(theta);
            return [ deg, radius ];
        });
        return _serie;
    };
 

    return Class;

});

