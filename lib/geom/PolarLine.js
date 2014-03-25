define(['d3', 'angularscale'], function(d3, AngularScale) {


    var Class = function PolarLine() {};

    Class.geom = function(angular, radial, frame, options) {
        var layout = Class.layout(angular, radial, frame, options);

        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('path.mark').data([0]);
            geometry.enter().append('path').attr({'class': 'mark no-fill'});
            geometryGroup.select('path.mark')
                .datum(data)
                .attr({
                    d: d3.svg.line.radial().radius(function(d, i) { return d.radius; }).angle(function(d) { return d.angle; }),
                    transform: function(d, i) {
                        if(!data.length || !data.hasOwnProperty(i)) { return ''; }
                        return 'rotate('+( data[i].rotate)+')';
                    }
            });
        };
    };

    Class.layout = function(angular, radial, frame, options) {
        var originTheta    = frame.originTheta || 0;

        return function(data) {
            return data.map(function(d, i) {
                var radius = radial(d[1]);
                var angle = AngularScale.radiansFromDegrees(angular(d[0]));
                var rotate = originTheta + 90;
                return {radius: radius, angle: angle, rotate: rotate};
            });
        };
    };
    return Class;

});
