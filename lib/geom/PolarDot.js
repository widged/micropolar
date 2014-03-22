define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarDot() {};

    Class.geom = function(angular, radial, options) {

        var originTheta = options.originTheta;
        var dotRadius   = options.dotRadius || 3;

        return function(geometryGroup, data) {
            var n = data.length;

            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('circle').attr({'class': 'mark'});
            geometry.attr({
                cy: function(d, i){
                    return radial(d[1]);
                },
                r: dotRadius,
                transform: function(d, i){ return 'rotate('+ (originTheta - 90 + (angular(d[0]))) +')'; }
            });
        };
    };



    return Class;

});
