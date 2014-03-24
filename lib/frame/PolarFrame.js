define(['accessmaker', 'radialscale'], function(AccessMaker, RadialScale) {

    var FN = {};

    var Class = function PolarFrame() {

        var instance = this;
        var state = {
            size: { height: 500, width: 500, margin: 0, radius: 250},
            radius : null,
            perimeter: null,
            originTheta: null
        }, rootNode;

        AccessMaker.allKeys(state, instance, []);
        AccessMaker.addConfig(state, instance);

        instance.validate = function() {
            var size = state.size;
            if(!state.radius) { state.radius = RadialScale.radiusFromSize(size.width, size.height, size.margin); }
            if(!state.originTheta) { state.originTheta = 0; }
        };

        return instance;
    };

    return Class;

});
