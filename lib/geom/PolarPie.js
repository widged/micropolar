define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarPie() {};

    Class.geom = function(angular, radial, options) {

            var originTheta = options.originTheta;
            var n           = options.n;

            return function(geometryGroup, data) {
                var geometry = geometryGroup.selectAll('.mark').data(data);
                geometry.enter().append('path').attr({'class': 'mark'});
                geometry.attr({
                    'class' : function(d, i) { return 'mark item-' + i; },
                    d: function(d, i){
                        var h = radial(d[1]);
                        var triangleAngle = (360 / n) * Math.PI / 180 / 2;
                        var baseW = Math.tan(triangleAngle) * h;
                        var p = 'M'+[[0, 0], [h, baseW], [h, -baseW]].join('L')+'Z';
                        return p;
                    },
                    transform: function(d, i){
                        var originTheta = options.originTheta;
                        var t = 'rotate('+ (originTheta - 30 + (angular(i))) +')';
                        return t;
                    }

                    // transform: function(d, i){ return 'rotate('+ (axisConfig.originTheta - 90 + (angular(d[0]))) +')'}
                });
            };
    };



    return Class;

});
