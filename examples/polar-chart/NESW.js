define(['d3'], function(d3) {

    var Class = function PolarNESW() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90, innerMargin: 10},
        angular: {domain: [0, 12], range: [0, 360], ticks: { major: ['North', 'East', 'South','West'], minorQty: 2 } },
        radial: {domain : null, range: null, ticks: {showCircle: true, axisTheta: -30} }
    };

    Class.applyFunction = function(fn) {
        return d3.range(0, 12).map(fn);
    };

    return Class;

});

