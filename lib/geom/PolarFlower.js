define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarFlower() {};

    Class.geom = function(angular, radial, frame, options) {
        var layout = Class.layout(angular, radial, frame, options);
        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + i; },
                d: function (d) { return "M0,0L" + d.s.x + "," + d.s.y + "Q" + d.c1.x + "," + d.c1.y + " " + d.m.x + "," + d.m.y + "L" + d.m.x + "," + d.m.y + "Q" + d.c2.x + "," + d.c2.y + " " + d.e.x + "," + d.e.y + "Z"; },
                transform: function(d) { return "rotate(" + d.rotate + ")"; }
            });

        };
    };


    Class.layout = function(angular, radial, frame, options) {
        var originTheta    = frame.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        var halfRadius = 55;

      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d[1]; });

        var size = d3.scale.sqrt()
          .domain([0, 1])
          .range([0, halfRadius]);

        function polarToCartesian(angle, radius) {
          return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          };
        }

        return function(data) {
            data = pie(data);

            return data.map(function(d, i) {
                var angle = (d.endAngle - d.startAngle) / 2,
                        s = polarToCartesian(-angle, halfRadius),
                        e = polarToCartesian(angle, halfRadius),
                        r = size(radial(d.value)),
                        m = {x: halfRadius + r, y: 0},
                        c1 = {x: halfRadius + (r / 2), y: s.y},
                        c2 = {x: halfRadius + (r / 2), y: e.y};
                    var angle2 = (d.startAngle + d.endAngle) / 2;
                    var rotate = (angle2 / Math.PI * 180) + (originTheta - 30 + 0);
                    return {rotate: rotate, s: s,c1: c1, m: m, c2: c2, e: e};
            });
        };
    };

    return Class;

});