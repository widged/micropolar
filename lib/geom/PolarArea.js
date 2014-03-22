define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarArea() {};

    Class.geom = function(angular, radial, options) {

        var originTheta    = options.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;


        return function(geometryGroup, data) {
            if(data.length) { data.push(data[0]); }

            var line = d3.svg.line.radial()
                .radius(function(d) {
                    return radial(d[1]);
                })
                .angle(function(d, i) {
                    var v = (d[0] === 12) ? 0 : d[0];
                    return angular(d[0]) * Math.PI / 180 * (flip?1:-1);
                });

            var geometry = geometryGroup.selectAll('path.mark').data([0]);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometryGroup.select('path.mark')
                .datum(data)
                .attr({
                    d: line,
                    transform: 'rotate('+(originTheta - 30 + 90)+')',
                    'stroke-width': lineStrokeSize + 'px'
            });
        };
    };



    return Class;

});


/*
var h = radial(d[1]);
                        var triangleAngle = (360 / n) * Math.PI / 180 / 2;
                        var baseW = Math.tan(triangleAngle) * h;
                        var p = 'M'+[[0, 0], [h, baseW], [h, -baseW]].join('L')+'Z';
                        return p;
*/