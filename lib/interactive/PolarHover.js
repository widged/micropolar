define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function PolarHover() {

        var instance = this;
        var state = {
            frame : null,
        }, rootNode;

        AccessMaker.allKeys(state, instance, []);

        instance.mountIn = function(node) {
            rootNode = node;
        };

       instance.activate = function() {

            var radius = state.frame.radius;

            rootNode.select('.geometry').style({'pointer-events': 'all'});

            var circle = rootNode.select('circle.background-circle');
            var chartGroup = rootNode.select('.chart-group');
            var guides = rootNode.select('.guides');
            function mouseFn() {
                var mousePos = d3.mouse(circle.node());
                var mouseX = mousePos[0];
                var mouseY = mousePos[1];
                return {x: mouseX, y: mouseY};
            }

            activateAngular(chartGroup, guides, mouseFn, {radius: radius});
            activateRadial(chartGroup, guides, mouseFn);
        };

        function activateAngular(chartGroup, guides, mouseFn, options) {

            var radius = options.radius;
            chartGroup
                .on('mousemove.angular-guide', function(d, i){
                    var mouse = mouseFn();
                    var mouseAngle = (Math.atan2(mouse.y, mouse.x) + Math.PI) / Math.PI * 180;
                    guides.select('line')
                        .attr({x1: 0, y1: 0, x2: -radius, y2: 0, transform: 'rotate('+mouseAngle+')'})
                        .style({stroke: 'grey', opacity: 1});
                 })
                .on('mouseout.angular-guide', function(d, i){ guides.select('line').style({opacity: 0}); });
        }

        function activateRadial(chartGroup, guides, mouseFn) {
            chartGroup
                .on('mousemove.radial-guide', function(d, i){
                    var mouse = mouseFn();
                    var r = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
                    if(isNaN(r)) { r = 0; }
                    guides.select('circle')
                        .attr({r: r})
                        .style({stroke: 'grey', fill: 'none', opacity: 1});
                 })
                .on('mouseout.radial-guide', function(d, i){ guides.select('circle').style({opacity: 0}); });

        }

        // var dispatch = d3.dispatch('hover');
        // d3.rebind(instance, dispatch, 'on');

        return instance;

    };


    return Class;

});
