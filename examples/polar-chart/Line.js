define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarline'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, LineGeom) {

    var FN = {};

    var Class = function PolarLine() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0, perimeter: 360},
        angular: {domain: [0, 360], range: -1, ticks: {majorStep: 30, majorQty: 12, majorSuffix: 'º' } },
        radial: {domain : [0, 2], range: [0, 115], ticks: {showCircle: true, axisTheta: -30} }
    };

 

    return Class;

});

