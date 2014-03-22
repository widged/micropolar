define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarbar'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, BarGeom) {

    var FN = {};

    var Class = function PolarBar() {

        var instance = this;

        var state = {
            data: [],
            size: {height: 250, width: 250, margin: 0, radius: 115},
            originTheta: 0,
            barWidth: 12,
            angularDomain: [0, 750],
            angularRange: [0, 360],
            angularMajorQty: 4,
            angularMinorQty: 1,
            radialDomain: [-40, 100],
            radialRange: null,
            axisTheta: 0

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
            var axisTheta   = state.axisTheta;
            var barW        = state.barWidth;
            var domainR     = state.radialDomain || PolarPlot.dataExtent(data, 1, 0, 1);
            var rangeA      = state.angularRange || -1;
            var rangeR      = state.radialRange || [0, radius];

            var scaleA = AngularScale.scale( {domain: domainA, range : rangeA});
            var scaleR  = RadialScale.scale(  {domain: domainR, range : rangeR});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    radius: radius,
                    originTheta: originTheta,
                })
                .ticks({
                    data: AngularAxis.ticks({majorQty: majorQty, perimeter : domainA[1]}),
                    orientation: 'angular'
                });


            var axisR = (new RadialAxis()).config({
                coord: scaleR,
                radius: radius,
                axisTheta: axisTheta
            });

            var geomFn = BarGeom.geom(scaleA, scaleR, { originTheta: originTheta, barW: barW});
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

