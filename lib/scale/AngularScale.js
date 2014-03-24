define(['scale'], function(Scale) {

    var FN = {};

    var Class = function AngularAxis() { };

    Class.scale = function(domain, range) {
        if(!domain) { domain = [0, 360]; }
        if(!range)  { range  = [0, 360]; }
        if(range === -1)  { range  = [360, 0]; }
        return Scale.scale(domain, range);
    };

    Class.radiansFromDegrees = function(degrees) { return degrees  * Math.PI / 180; };

    return Class;

});
