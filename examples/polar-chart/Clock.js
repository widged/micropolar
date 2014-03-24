define(['angularaxis'], function(AngularAxis) {

    var Class = function PolarClock() {};

    var ticks = {
        data: AngularAxis.ticks({majorQty: 4, minorQty: 2, majorFmt: function(value) { return (value === 0) ? 12 : value; } }),
        labelOffset: -15,
        orientation: 'horizontal',
        lengthSpan: [115 - 5, 115],
        perimeter: 12,
        majorQty: 4,
        minorQty: 0
    };

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90},
        angular: {domain: [0, 12], range: [0, 360], ticks: ticks },
        radial: {domain : [0, 1], range: null, ticks: {showCircle: false, axisTheta: 0} }
    };


 Class.geom = function(angular, radial, frame, options) {

        var originTheta    = frame.originTheta || 0;
        var dotRadius      = options.dotRadius || 3;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        return function(geometryGroup, data) {


            var triangleAngle = (360 / data.length) * Math.PI / 180 / 2;
            var radius = radial(1);
            var handsHeight = [radius / 1.3, radius / 1.5, radius / 1.5];
            var handsWidth = [radius / 15, radius / 10, radius / 30];
            
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('rect').attr({'class': 'mark'});
            geometry.attr({
                x: function(d, i){ return -handsWidth[i]/2; },
                y: function(d, i){ return i==2 ? -radius/5 : 0; },
                width: function(d, i){ return handsWidth[i]; },
                height: function(d, i){ return handsHeight[i]; },
                transform: function(d, i){ return 'rotate('+ (originTheta - 90 + (angular(d))) +')'; }
            });

            geometryGroup.selectAll('circle.mark').data([0])
                .enter().append('circle').attr({'class': 'mark'}).attr({r: radius / 10}).style({'fill-opacity': 1});

        };
    };
 

    return Class;

});

