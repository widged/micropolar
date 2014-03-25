define(['d3'], function(d3) {

    var FN = {};

    var Class = function PolarArea() {};

    Class.geom = function(angular, radial, frame, options) {
        var layout = Class.layout(angular, radial, frame, options);
        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('path.mark').data([0]);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometryGroup.select('path.mark')
                .datum(data)
                .attr({
                    d: d3.svg.line.radial().radius(function(d) { return d.radius; }).angle(function(d) { return d.angle; }),
                    transform: function(dx, i) { var d = data[i]; return  'rotate('+ (d.rotate) +')'; }
            });
        };
    };

    Class.layout = function(angular, radial, frame, options) {
        var originTheta    = frame.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        return function(data) {
            if(data.length) { data.push(data[0]); }
            return data.map(function(d, i)  {
                var radius = radial(d[1]);
                var v = (d[0] === 12) ? 0 : d[0];
                var angle = angular(d[0]) * Math.PI / 180 * (flip?1:-1);
                var rotate = (originTheta - 30 + 90);
                return {radius: radius, angle: angle, rotate: rotate };
            });
        };
    };


    return Class;

});
