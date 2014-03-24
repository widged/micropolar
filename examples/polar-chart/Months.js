define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polararea', 'polarpie'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, AreaGeom, PieGeom) {

    var FN = {};


    var Class = function PolarMonths() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90, innerMargin: 3},
        angular: {domain: [0, 12], range: null, ticks: { major: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'], orientation: 'angular' } },
        radial: {domain : [0, 14], range: null, ticks: {showCircle: true, axisTheta: -30} }
    };


    Class.mapToData = function(obj) {
        return Object.keys(obj).map(function(key, i) { return [i, obj[key]]; });
    };

 

    return Class;

});

