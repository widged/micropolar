define([], function() {

    var Class = function PolarBands() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0, perimeter: 14},
        angular: {domain: [0, 14], range: null, ticks: { perimeter: 14, minorQty: 1, majorQty: 7 } },
        radial: {domain : [0, 5], range: null, ticks: {showCircle: true, axisTheta: 0} }
    };

    return Class;

});

