// https://github.com/umdjs/umd/blob/master/nodeAdapter.js
if (typeof module === 'object' && typeof define !== 'function') { var define = function (factory) { module.exports = factory(require, exports, module); };}

define(function (require, exports, module) {

    var Class = function PolarDot() {};

    Class.geom = function(angular, radial, frame, options) {

        var layout = Class.layout(angular, radial, frame, options);

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

    Class.layout = function(angular, radial, frame, options) {
        var originTheta = frame.originTheta || 0;
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
