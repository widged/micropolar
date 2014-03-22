define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function AngularAxis() { };

    Class.scale = function(config) {
        var domain = config.domain;
        var range = config.range;
        if(!domain) { domain = [0, 360]; }
        if(!range)  { range  = [0, 360]; }
        if(range === -1)  { range  = [360, 0]; }
        var fn = d3.scale.linear()
            .domain(domain)
            .range(range);
        return fn;
    };

    return Class;

});
