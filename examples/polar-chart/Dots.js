define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polardot'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, DotGeom) {

    var FN = {};

var Class = function PolarDot() {};

  Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0, perimeter: 1000},
        angular: {domain: [0, 1000], range: -1, ticks: {perimeter: 1000, majorQty: 10, minorQty: 1 } },
        radial: {domain : null, range: [0, 115], ticks: {showCircle: true, axisTheta: -30} }
    };


    return Class;

});

