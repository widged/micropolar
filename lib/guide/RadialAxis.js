define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};


    var Class = function RadialGuide() {

        var instance = this;

        var state = {
            scale: null,
            frame: null,
            ticks: null
        };

        AccessMaker.allKeys(state, instance, []);
        AccessMaker.addConfig(state, instance);

        instance.mountIn = function(rootNode) {

            var scale  = state.scale;
            var frame  = state.frame;
            var ticks  = state.ticks || {};

            var radius = frame.radius;
            var axisTheta = ticks.axisTheta;
            var majorSuffix = ticks.majorSuffix || '';
            var majorQty = ticks.majorQty || 4;

            var axisNode = rootNode.select('.radial.axis');

            if(ticks.showCircle) {
                renderMarks(axisNode, scale, majorQty);
                renderLabels(axisNode, scale, axisTheta, majorQty, majorSuffix);
            }

            return instance;
        };

        function renderMarks(axisNode, scale, majorQty) {
            var gridCircles = axisNode.selectAll('circle.grid-circle')
                .data(scale.ticks(majorQty));
            var gridCirclesEnter = gridCircles.enter().append('circle').attr({'class': 'grid-circle'});

            gridCircles.attr('r', scale);
            gridCircles.exit().remove();
        }

        function renderLabels(axisNode, scale, axisTheta, majorQty, ticksSuffix) {
            var axis = d3.svg.axis().scale(scale).ticks(majorQty);
            axisNode.call(axis).attr({transform: 'rotate('+ (axisTheta) +')'});
            axisNode.selectAll('.domain').style({fill: 'none', stroke: 'black'});
            axisNode.selectAll('.tick.major text').text(function(d, i){ return this.textContent + ticksSuffix; });
        }

        return instance;

    };


    return Class;

});
