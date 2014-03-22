define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarLine() {};

    Class.geom = function(angular, radial, options) {

        var originTheta    = options.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        return function(geometryGroup, data) {

            var line = d3.svg.line.radial()
                .radius(function(d) {
                    return radial(d[1]);
                })
                .angle(function(d) {
                    return d[0] * Math.PI / 180 * (flip?1:-1); });

            var geometry = geometryGroup.selectAll('path.mark').data([0]);
            geometry.enter().append('path').attr({'class': 'mark no-fill'});
            geometryGroup.select('path.mark')
                    .datum(data)
                    .attr({
                        d: line,
                        transform: 'rotate('+(originTheta + 90)+')',
                        'stroke-width': lineStrokeSize + 'px'
                });
        };
    };


    return Class;

});
