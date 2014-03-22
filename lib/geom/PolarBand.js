define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarPetal() {};

    Class.geom = function(angular, radial, options) {

        var originTheta    = options.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        var barW = 0.9;
        var r = 20;


        return function(geometryGroup, data) {

            data = [[1,4],[2,8],[3,6],[4,12]];

            var geomPath = d3.svg.arc()
                            .startAngle(0)
                            .endAngle(function(d) {
                                console.log(angular(d[1]) * Math.PI / 180);
                                return angular(d[1]) * Math.PI / 180;
                            })
                            .innerRadius(function(d) {
                                return d[0] * r;
                            })
                            .outerRadius(function(d) {
                                return (d[0] + barW) * r;
                            });

            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('path').attr({'class': 'mark'});
            geometry.attr({
                        'class' : function(d, i) { return 'mark item-' + d[0]; },
                        d: geomPath,
                        transform: 'rotate('+(originTheta  + 90)+')',
                        'stroke-width': lineStrokeSize + 'px'
                });

        };
    };



    return Class;

});

