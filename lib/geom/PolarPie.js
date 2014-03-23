define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarPie() {};

    Class.geom = function(angular, radial, options) {
        var layout = Class.layout(angular, radial, options);
        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + i; },
                d: function(d, i) { return 'M'+ d.lines.join('L')+'Z'; },
                transform: function(d, i) { return d.rotate; }
            });
        };
    };

    Class.layout = function(angular, radial, options) {
        var originTheta = options.originTheta;
        var n           = options.n;

        return function(data) {
            return data.map(function(d, i) {
                var h = radial(d[1]);
                var triangleAngle = (360 / n) * Math.PI / 180 / 2;
                var baseW = Math.tan(triangleAngle) * h;
                var rotate = 'rotate('+ (originTheta - 30 + (angular(i))) +')';
                var lines = [[0, 0], [h, baseW], [h, -baseW]];
                return {h: h, baseW: baseW, rotate: rotate, lines: lines};
            });
        };
    };

    return Class;

});
