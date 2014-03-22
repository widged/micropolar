define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarline'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, LineGeom) {

    var FN = {};

    var Class = function PolarMultiline() {

        var instance = this;

        var state = {
            series: [],
            size: {height: 250, width: 250, margin: 0, radius: 115}
        }, rootNode;

        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'series') { render(); }
            return value;
        }

        instance.mountIn = function(node) {
            rootNode = node;
            render();
            return instance;
        };

        function render() {
            if(!rootNode) { return; }

            var series = state.series;
            if(!series) { series = []; }

            var size = state.size;

            var scaleA = AngularScale.scale( {domain: [0, 360]});
            var scaleR  = RadialScale.scale(  {domain: [0, 1], range : [0, size.radius]});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    radius: size.radius,
                    originTheta: +30,
                })
                .ticks({
                    data: AngularAxis.ticks({perimeter: 360, majorStep: 30, majorSuffix: 'º' })
                });

            var axisR = (new RadialAxis()).config({
                coord: scaleR,
                radius: size.radius,
                axisTheta: -30
            });

            var geomFn = LineGeom.geom(scaleA, scaleR, { n: 360, originTheta: -90, barW: 12});
            var polarInteractive = (new PolarHover()).radius(size.radius);

            var plot = (new PolarPlot())
                .size(size)
                .mountIn(rootNode)
                .addGuide(axisA)
                .addGuide(axisR);

             series.forEach(function(serie) {
                plot.addGeom(geomFn, serie.data, serie.className);
             });
            
            plot.addInteractive(polarInteractive);

        }


        return instance;

    };

    Class.deriveSerieData = function(_serie, _step) {
        var step = _step || 6;
        var fn = _serie.fn;
        _serie.data = d3.range(0, 360 + step, step).map(function(deg, index) {
            var theta = deg * Math.PI / 180;
            var radius = fn(theta);
            return [ deg, radius ];
        });
        return _serie;
    };
 

    return Class;

});

