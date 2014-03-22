define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarBar() {};

    Class.geom = function(angular, radial, options) {
        var barW        = options.barW;
        var originTheta = options.originTheta;

        return function(geometryGroup, data) {

            var n           = options.n || data.length;

            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('rect').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + i; },
                x: -barW/2,
                y: radial(0),
                width: barW,
                height: function(d, i){ return radial(d[1]); }, // 
                transform: function(d, i) {
                    return 'rotate('+ (originTheta - 30 - 90 + angular(d[0])) +')';
                }
            });

        };
    };



    return Class;

});
