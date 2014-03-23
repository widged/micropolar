define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarLine() {};

    Class.geom = function(angular, radial, options) {
        var layout = Class.layout(angular, radial, options);

        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('path.mark').data([0]);
            geometry.enter().append('path').attr({'class': 'mark no-fill'});
            geometryGroup.select('path.mark')
                .datum(data)
                .attr({
                    d: d3.svg.line.radial().radius(function(d, i) { return d.radius; }).angle(function(d) { return d.angle; }),
                    transform: function(d, i) { return (data.length) ? 'rotate('+( data[i].rotate)+')' : ''; }
            });
        };
    };

    Class.layout = function(angular, radial, options) {
        var originTheta    = options.originTheta || 0;
        var flip           = options.flip || true;

        return function(data) {
            return data.map(function(d, i) {
                var radius = radial(d[1]);
                var angle = d[0] * Math.PI / 180 * (flip?1:-1);
                var rotate = originTheta + 90;
                return {radius: radius, angle: angle, rotate: rotate};
            });
        };
    };
    return Class;

});
