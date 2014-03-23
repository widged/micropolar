define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarPetal() {};

    Class.geom = function(angular, radial, options) {

        var layout = Class.layout(angular, radial, options);

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

    Class.layout = function(angular, radial, options) {
        var originTheta    = options.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;
        var barW = 0.9;
        var r = 20;

        return function(data) {
            if(data.length) { data.push(data[0]); }
            return data.map(function(d, i) {
                console.log(angular(d[1]) * Math.PI / 180);
                var endAngle = angular(d[1]) * Math.PI / 180;
                var innerRadius = d[0] * r;
                var outerRadius = (d[0] + barW) * r;
                var rotate = originTheta  + 90;
                return {endAngle: endAngle, innerRadius: innerRadius, outerRadius: outerRadius, rotate: rotate };
            });
        };
    };

    return Class;

});

