define(['d3', 'accessmaker'], function(d3, AccessMaker) {

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
            size: { height: 500, width: 500, margin: 0, radius: 250},
            radius : 250,
        }, rootNode;

        AccessMaker.allKeys(state, instance, []);

        instance.mountIn = function(node) {
            rootNode = node;
            rootNode.innerHTML = template;
            instance.rootNode = rootNode;

            var radius = state.size.radius;

            var container = d3.select(rootNode);
           
            var svg = container.select('svg');
            svg.attr({width: state.size.width, height: state.size.height})
                .style({'pointer-events': 'none'});

            svg.select('circle.background-circle').attr({r: radius}).style({'fill': 'white'});

            var chartGroup = svg.select('.chart-group')
                .attr('transform', 'translate(' + state.size.width / 2 + ',' + state.size.height / 2 + ')');

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

        // var dispatch = d3.dispatch('hover');
        // d3.rebind(instance, dispatch, 'on');

        return instance;

    };

    Class.dataExtent = function(data, dimId, margin) {
        var ext = d3.extent((data || []).map(function(d, i){ return d[dimId]; }));
        ext[1] += margin;
        return ext;
    };



    return Class;

});
