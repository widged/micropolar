define([], function() {

    var Class = function PolarBar() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0},
        angular: {domain: [0, 750], range: [0, 360], ticks: { perimeter: 750, majorQty: 4 } },
        radial: {domain : [-40, 100], range: null, ticks: {showCircle: true, axisTheta: -30} }
    };

    return Class;

});

