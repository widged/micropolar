define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarDot() {};

    Class.geom = function(angular, radial, options) {

        var layout = Class.layout(angular, radial, options);

        return function(geometryGroup, data) {
            data = layout(data);

            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('circle').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + i; },
                cy: function(d){ return d.cy; },
                r: function(d) { return d.radius; },
                transform: function(d) { return 'rotate('+ (d.rotate) +')'; }
            });
        };
    };

    Class.layout = function(angular, radial, options) {
        var originTheta = options.originTheta;
        var dotRadius   = options.dotRadius || 3;

        return function(data) {
            return data.map(function(d, i) {
                var rotate = (originTheta - 90 + (angular(d[0])));
                var radius = dotRadius;
                var cy = radial(d[1]);
                return {rotate: rotate, radius: radius, cy: cy};
            });
        };
    };

    return Class;

});
