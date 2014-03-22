define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarpie'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, PieGeom) {

    var FN = {};

    var Class = function PolarNESW() {

        var instance = this;

        var state = {
            data: [],
            size: {height: 250, width: 250, margin: 0, radius: 115}
        }, rootNode;

        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'data') { render(); }
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
            if(!data) { rootNode.innerHTML = ""; }

            var size = state.size;
            
            var scaleA = AngularScale.scale( {domain: [0, 12]});
            var scaleR  = RadialScale.scale(  {domain: PolarPlot.dataExtent(data, 1, 1), range : [0, size.radius]});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    originTheta: -60,
                    radius: size.radius
                })
                .ticks({
                    data: AngularAxis.ticks({major: ['North', 'East', 'South','West'], minorQty: 2})
                });

            var axisR = (new RadialAxis())
                .config({
                    coord: scaleR,
                    radius: size.radius,
                    axisTheta: -30,
                    ticksSuffix: '%',
                });

            var geomFn = PieGeom.geom(scaleA, scaleR, { n: data.length, originTheta: -90, barW: 12});
            var polarInteractive = (new PolarHover()).radius(size.radius);

            var plot = (new PolarPlot())
                .size(size)
                .mountIn(rootNode)
                .addGuide(axisA)
                .addGuide(axisR)
                .addGeom(geomFn, data)
                .addInteractive(polarInteractive);

        }


        return instance;

    };

    Class.applyFunction = function(fn) {
        return d3.range(0, 12).map(fn);
    };

 

    return Class;

});

