define(['d3'], function(d3) {

    var Class = function AngularAxis() { };

    Class.scale = function(domain, range) {
        var fn = d3.scale.linear().domain(domain).range(range);
        return fn;
    };

    Class.radians = function(degrees) { return degrees  * Math.PI / 180; };

    return Class;

});
