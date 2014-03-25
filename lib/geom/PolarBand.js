define(['d3'], function(d3) {

    var FN = {};

    var Class = function PolarBand() {};

    Class.geom = function(angular, radial, frame, options) {

        var layout = Class.layout(angular, radial, frame, options || {});

        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + d[0]; },
                d: d3.svg.arc().startAngle(0).endAngle(function(d) { return d.endAngle; }).innerRadius(function(d) { return d.innerRadius; }).outerRadius(function(d) { return d.outerRadius; }),
                transform: function(d, i) { return 'rotate('+(d.rotate)+')'; }
            });
        };
    };

    Class.layout = function(angular, radial, frame, options) {
        var originTheta    = frame.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;
        var barW           = options.radius || radial(0.9);

        return function(data) {
            return data.map(function(d, i) {
                var endAngle = angular(d[1]) * Math.PI / 180;
                var innerRadius = radial(d[0]);
                var outerRadius = innerRadius + barW;
                var rotate = originTheta  + 90;
                return {endAngle: endAngle, innerRadius: innerRadius, outerRadius: outerRadius, rotate: rotate };
            });
        };
    };

    return Class;

});

