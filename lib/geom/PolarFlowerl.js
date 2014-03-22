define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarBand() {};

    Class.geom = function(angular, radial, options) {

        var originTheta    = options.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        var halfRadius = 55;

          var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d[1]; });

            var size = d3.scale.sqrt()
              .domain([0, 1])
              .range([0, halfRadius]);

            function r(angle) { return "rotate(" + ((angle / Math.PI * 180) + (originTheta - 30 + 0)) + ")"; }

        return function(geometryGroup, data) {
            
            data = pie(data);
            var petals = data.length;


            var geomPath = function petalPath(d) {
                var angle = (d.endAngle - d.startAngle) / 2,
                    s = polarToCartesian(-angle, halfRadius),
                    e = polarToCartesian(angle, halfRadius),
                    r = size(radial(d.value)),
                    m = {x: halfRadius + r, y: 0},
                    c1 = {x: halfRadius + (r / 2), y: s.y},
                    c2 = {x: halfRadius + (r / 2), y: e.y};
                return "M0,0L" + s.x + "," + s.y + "Q" + c1.x + "," + c1.y + " " + m.x + "," + m.y + "L" + m.x + "," + m.y + "Q" + c2.x + "," + c2.y + " " + e.x + "," + e.y + "Z";
              };

            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometry.attr({
                        'class' : function(d, i) { return 'mark item-' + i; },
                        d: geomPath,
                        transform: function(d) { return r((d.startAngle + d.endAngle) / 2); },
                        'stroke-width': lineStrokeSize + 'px'
                });

        };
    };





    function polarToCartesian(angle, radius) {
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    }


    return Class;

});