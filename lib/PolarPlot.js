define(['d3', 'accessmaker', 'polarhover'], function(d3, AccessMaker, PolarHover) {

    var FN = {};

   var template = function() {/*
    <x-polar-chart>
        <svg class="chart">
            <g class="chart-group">
                <circle class="background-circle"></circle>
                <g class="angular axis">
                    <circle class="outside-circle"></circle>
                </g>
               <g class="geometry"></g>
               <g class="radial axis">
                </g>
                <g class="guides"><line></line><circle></circle></g>
            </g>
        </svg>  
    </x-polar-chart>
    */}.toString().match(/[\s\S]*\/\*([\s\S]*)\*\/[\s\S]*/)[1];

    var Class = function PolarPlot() {

        var instance = this;
        var state = {
            series: [],
            frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: 0, perimeter: 14},
            angular: {domain: [0, 360], range: null, ticks: { minorQty: 1, majorStep: 30, majorQty: 10, labelOffset: 6, suffix: '', orientation: 'angular'  } },
            radial: {domain : [0, 1], range: null, ticks: {showCircle: true, axisTheta: -30, majorQty: 5, majorSuffix: ''} },
            interactives: {list: [(new PolarHover())] }
        }, rootNode;


        AccessMaker.allKeys(state, instance, [], stateChange);
        AccessMaker.addConfig(state, instance);

        function stateChange(key, value) {
            if(key === 'series') { render(); }
            return value;
        }

        instance.mountIn = function(node) {
            rootNode = node;

            rootNode.innerHTML = template;
            instance.rootNode = rootNode;

            var frame = state.frame;
            var radius = frame.radius;
            var height = frame.height;
            var width  = frame.width;

            var container = d3.select(rootNode);
           
            var svg = container.select('svg');
            svg.attr({width: width, height: height})
                .style({'pointer-events': 'none'});

            svg.select('circle.background-circle').attr({r: radius}).style({'fill': 'white'});

            var chartGroup = svg.select('.chart-group')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            return instance;
        };


        instance.addGuide = function(guide) {
            var svg = d3.select(rootNode).select('svg');
            guide.mountIn(svg);
            return instance;
        };

        instance.addGeom = function(geomFn, data, cssClass) {
            var geometry = d3.select(rootNode).select('svg g.geometry');
            var geometryGroup = geometry.append('g').attr({class: cssClass});
            geomFn(geometryGroup, data, cssClass);
            return instance;
        };

        instance.addInteractive = function(interactive) {
            var svg = d3.select(rootNode).select('svg');
            interactive.mountIn(svg);
            interactive.activate();
            return instance;
        };

        instance.draw = function(frame, angular, radial, series, interactive) {
            if(!series || !series.length) { rootNode.innerHTML = "";  return;}
            Class.draw(instance, frame, angular, radial, series, interactive);
        };

        function render() {
            if(!rootNode) { return ; }
            instance.draw(
                state.frame,
                state.angular,
                state.radial,
                state.series,
                state.interactives
            );
        }

        // var dispatch = d3.dispatch('hover');
        // d3.rebind(instance, dispatch, 'on');

        return instance;

    };

    Class.draw = function(plot, frame, angular, radial, series, interactive) {

        requirejs(['radialscale', 'angularscale', 'radialaxis', 'angularaxis'], function(RadialScale, AngularScale, RadialAxis, AngularAxis) {

            var radius      = frame.radius;
            var innerMargin = frame.innerMargin || 0;

            var scaleA = AngularScale.scale(angular.domain, angular.range);
            var ticksA = angular.ticks;

            var data = (series && series.length) ? series[0].data : [];
            if(!radial.domain ) { radial.domain  =  Class.dataExtent(data, 1, 0); }
            if(!radial.range ) { radial.range  =  [0, radius - innerMargin]; }
            var scaleR  = RadialScale.scale(radial.domain, radial.range);
            var ticksR  = radial.ticks;

            console.log(radial.domain, radial.range)

            var interactives = interactive.list;

            var axisA = (new AngularAxis())
                .config({
                    scale: scaleA,
                    frame: frame,
                    ticks: ticksA
                });



            var axisR = (new RadialAxis())
                .config({
                    scale: scaleR,
                    frame: frame,
                    ticks: ticksR
                });


            plot.addGuide(axisA);
            plot.addGuide(axisR);

            (series || []).forEach(function(serie, i) {
                var geomFn = serie.factory.geom(scaleA, scaleR, frame, serie.config || {});
                plot.addGeom(geomFn, serie.data, serie.className);
             });

            (interactives || []).forEach(function(item) {
                item.frame(frame);
                plot.addInteractive(item);
            });

        });
    };
    Class.dataExtent = function(data, dimId, margin) {
        var ext = d3.extent((data || []).map(function(d, i){ return d[dimId]; }));
        ext[1] += margin;
        return ext;
    };



    return Class;

});
