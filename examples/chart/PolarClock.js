define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover) {

    var FN = {};

    var Class = function PolarClock() {

        var instance = this;

        var state = {
            data: [],
            size: {height: 250, width: 250, margin: 0, radius: 115}
        }, rootNode;

        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'data') {
                render(); }
            return value;
        }

        instance.mountIn = function(node) {
            rootNode = node;
            render();
            return instance;
        };

        function render() {
            if(!rootNode) { return; }

            var data = state.data;
            if(!data) { data = []; }


            var size = state.size;

            var scaleA = AngularScale.scale( {domain: [0, 12]});
            var scaleR  = RadialScale.scale(  {domain: [0, 1], range : [0, size.radius]});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    radius: size.radius,
                    originTheta: -90,
                }).ticks({
                    data: AngularAxis.ticks({majorQty: 4, minorQty: 2, majorFmt: function(value) { return (value === 0) ? 12 : value; } }),
                    labelOffset: -15,
                    orientation: 'horizontal',
                    lengthSpan: [size.radius - 5, size.radius]
                });


            var axisR = (new RadialAxis()).config({
                coord: scaleR,
                radius: size.radius,
                axisTheta: -30,
                showAxis: false,
                showCircle: false,
            });

            var geomFn = Class.geom(scaleA, scaleR, { n: data.length, originTheta: -90, barW: 12});

            var plot = (new PolarPlot())
                .size(size)
                .mountIn(rootNode)
                .addGuide(axisA)
                .addGuide(axisR)
                .addGeom(geomFn, data);

        }


        return instance;

    };

 Class.geom = function(angular, radial, options) {

        var originTheta    = options.originTheta || 0;
        var dotRadius      = options.dotRadius || 3;
        var lineStrokeSize = options.lineStrokeSize || 2;
        var flip           = options.flip || true;

        return function(geometryGroup, data) {


            var triangleAngle = (360 / data.length) * Math.PI / 180 / 2;
            var radius = radial(1);
            var handsHeight = [radius / 1.3, radius / 1.5, radius / 1.5];
            var handsWidth = [radius / 15, radius / 10, radius / 30];
            
            var geometry = geometryGroup.selectAll('.mark').data(data);
            geometry.enter().append('rect').attr({'class': 'mark'});
            geometry.attr({
                x: function(d, i){ return -handsWidth[i]/2; },
                y: function(d, i){ return i==2 ? -radius/5 : 0; },
                width: function(d, i){ return handsWidth[i]; },
                height: function(d, i){ return handsHeight[i]; },
                transform: function(d, i){ return 'rotate('+ (originTheta - 90 + (angular(d))) +')'; }
            });

            geometryGroup.selectAll('circle.mark').data([0])
                .enter().append('circle').attr({'class': 'mark'}).attr({r: radius / 10}).style({'fill-opacity': 1});

        };
    };
 

    return Class;

});

