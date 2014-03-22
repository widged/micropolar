define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarline'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, LineGeom) {

    var FN = {};

    var Class = function PolarLine() {

        var instance = this;

        var state = {
            data: [],
            size: {height: 250, width: 250, margin: 0, radius: 115},
            originTheta: +30,
            barWidth: 12,
            angularMajorQty: 10,
            angularMinorQty: 1,
            angularDomain: [0, 360],
            radialDomain: [0, 2],
            angularRange: [360, 0],
            radialRange: [0, 115]

        }, rootNode;


        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'data') {
                render();
            }
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
            var radius      = size.radius;
            var originTheta = state.originTheta;
            var majorQty    = state.angularMajorQty;
            var minorQty    = state.angularMinorQty;
            var domainA     = state.angularDomain;
            var domainR     = state.radialDomain || PolarPlot.dataExtent(data, 1, 0, 5);
            var rangeA      = state.angularRange || -1;
            var rangeR      = state.radialRange || [0, radius];
            var majorSuffix = state.angularMajorSuffix || 'º';
            var majorStep   = state.angularMajorStep || 30;
            var axisTheta   = state.axisTheta || -30;

            var scaleA = AngularScale.scale( {domain: domainA, range : rangeA});
            var scaleR  = RadialScale.scale(  {domain: domainR, range : rangeR});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    radius: radius,
                    originTheta: originTheta,
                })
                .ticks({
                    data: AngularAxis.ticks({perimeter: domainA[1], majorStep: majorStep, majorSuffix: majorSuffix })
                });

            var axisR = (new RadialAxis()).config({
                coord: scaleR,
                radius: radius,
                axisTheta: axisTheta
            });

            var geomFn = LineGeom.geom(scaleA, scaleR, { originTheta: originTheta});
            var polarInteractive = (new PolarHover()).radius(radius);

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

