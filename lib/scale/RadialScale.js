define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function RadialCoord() {};

    Class.scale = function(config){
        var domain = config.domain;
        var range = config.range;
        if(!range) { range = [0, 250]; }

        var fn = d3.scale.linear()
            .domain(domain)
            .range(range);
        return fn;
    };

    Class.radiusFromSize = function(width, height, margin) {
        return Math.min(width, height) / 2 - margin;
    };

    return Class;

});
