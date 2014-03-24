define(['scale'], function(Scale) {

    var FN = {};

    var Class = function RadialCoord() {};

    Class.scale = function(domain, range){
        if(!range) { range = [0, 250]; }
        return Scale.scale(domain, range);
    };

    Class.radiusFromSize = function(width, height, margin) {
        return Math.min(width, height) / 2 - margin;
    };

    return Class;

});
