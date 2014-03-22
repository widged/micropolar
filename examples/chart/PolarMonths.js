define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polararea', 'polarpie'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, AreaGeom, PieGeom) {

    var FN = {};

    var Class = function PolarMonths() {

        var instance = this;

        var state = {
            data: [],
            size: {height: 250, width: 250, margin: 0, radius: 115},
            geomFactory: PieGeom,
            radialRange: [0, 115]
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
            var geomFactory = state.geomFactory;
            var rangeR      = state.radialRange || [0, radius];

            var domainR = PolarPlot.dataExtent(data, 1, 1);

            var scaleA = AngularScale.scale( {domain: [0, 12], range : [0, 360]});
            var scaleR  = RadialScale.scale(  {domain: [0, domainR[1]] , range : rangeR});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    radius: size.radius,
                    originTheta: -90,
                })
                .ticks({
                    data: AngularAxis.ticks({major: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']}),
                    orientation: 'angular'
                });

            var axisR = (new RadialAxis())
                .config({
                    coord: scaleR,
                    radius: size.radius,
                    axisTheta: -30,
                    margin: 10,
                    ticksSuffix: '',
                    showAxis: true,
                    showCircle: true
                });

            var geomFn = geomFactory.geom(scaleA, scaleR, { n: data.length, originTheta: -90, barW: 12});
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

    Class.mapToData = function(obj) {
        return Object.keys(obj).map(function(key, i) { return [i, obj[key]]; });
    };

 

    return Class;

});

