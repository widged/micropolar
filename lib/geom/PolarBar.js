define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarBar() {};

    Class.geom = function(angular, radial, frame, options) {

        var layout = Class.layout(angular, radial, frame, options);

        return function(geometryGroup, data) {
            data = layout(data);
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('rect').attr({'class': 'mark'});
            geometry.attr({
                'class' : function(d, i) { return 'mark item-' + i; },
                x: function(d) { return d.x; },
                y: function(d) { return d.y; },
                width: function(d) { return d.width; },
                height: function(d){ return d.height; }, // 
                transform: function(d) { return 'rotate('+ (d.rotate) +')'; } });
        };
    };


    Class.layout = function(angular, radial, frame, options) {
        var originTheta    = frame.originTheta || 0;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;
        var barW        = options.barW || 12;

        return function(data) {
            return data.map(function(d, i) {
                var rotate = originTheta - 30 - 90 + angular(d[0]);
                var x = -barW/2;
                var y = radial(0);
                var width = barW;
                var height = radial(d[1]);
                return {rotate: rotate, x: x, y: y, width: width, height: height};
         });
        };
    };


    return Class;

});
