define(['d3', 'accessmaker', 'polarplot', 'radialscale', 'angularscale', 'radialaxis', 'angularaxis', 'polarhover', 'polarpie'], function(d3, AccessMaker, PolarPlot, RadialScale, AngularScale, RadialAxis, AngularAxis, PolarHover, PieGeom) {

    var FN = {};

    var Class = function PolarStackedMonths() {

        var instance = this;

        var state = {
            series: [],
            size: {height: 250, width: 250, margin: 0, radius: 115}
        }, rootNode;

        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'series') {
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

            var series = state.series;
            if(!series) { series = []; }


            var size = state.size;
            var serieMax = 0;

            if(series.length) {
                var lastSerie = series[series.length - 1];
                serieMax = PolarPlot.dataExtent(lastSerie.data, 1, 20)[1];
            }


            var scaleA = AngularScale.scale( {domain: [0, 12]});
            var scaleR  = RadialScale.scale(  {domain: [0, serieMax], range : [0, size.radius]});

            var axisA = (new AngularAxis())
                .config({
                    coord: scaleA,
                    originTheta: -60,
                    radius: size.radius
                })
                .ticks({
                    data: AngularAxis.ticks({major: ['Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar']}),
                });

            var axisR = (new RadialAxis())
                .config({
                    coord: scaleR,
                    radius: size.radius,
                    axisTheta: -30,
                    ticksSuffix: '',
                });

            var geomFn = PieGeom.geom(scaleA, scaleR, { originTheta: -90, barW: 12, n: 12});
            var polarInteractive = (new PolarHover()).radius(size.radius);

            var plot = (new PolarPlot())
                .size(size)
                .mountIn(rootNode)
                .addGuide(axisA)
                .addGuide(axisR);

            var i = series.length;
            while(--i >= 0) {
                var serie = series[i];
                plot.addGeom(geomFn, serie.data, serie.className);
            }
            
            plot.addInteractive(polarInteractive);

        }


        return instance;

    };

    Class.stackedSeriesFromTable = function(data, getData, getCategory) {

        var categories = [];
        var dataPoints = [];
        data.forEach(function(item, i) {
            var cat = getCategory(item);
            var catId = categories.indexOf(cat);
            if(catId === -1) { catId = categories.length; categories.push(cat); }
            if(!dataPoints[catId]) { dataPoints[catId] = []; }
            dataPoints[catId].push(getData(item));
        });

        dataPoints.forEach(function(rows, catId) {
            if(catId === 0 ) { return ; }
            for(var i = 0, ni = rows.length; i < ni; i++) {
                rows[i] += dataPoints[catId-1][i];
            }
        });

        var series = dataPoints.map(function(rows, catId) {
            for(var i = 0, ni = rows.length; i < ni; i++) {
                var value = rows[i];
                rows[i] = [i, value];
            }
            return { data: rows, className: categories[catId] };
        });

        return series;
    };

 

    return Class;

});

