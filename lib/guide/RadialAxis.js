define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};


    var Class = function RadialGuide() {

        var instance = this;

        var state = {
            plot: null,
            coord: null,
            radius: 250,
            margin: 10,
            axisTheta: -45,
            ticksSuffix: '',
            showAxis: true,
            showCircle: true
        };

        AccessMaker.allKeys(state, instance, []);
        AccessMaker.addConfig(state, instance);

        instance.mountIn = function(rootNode) {

            var axisCoord = state.coord;
            var radius    = state.radius;

            var axisNode = rootNode.select('.angular.axis');

            if(state.showCircle) {
                renderTickMarks(axisNode, axisCoord);
                renderTickLabels(axisNode, axisCoord, state.axisTheta, state.ticksSuffix);
            }

            return instance;
        };

        function renderTickMarks(axisNode, axisCoord) {
            var gridCircles = axisNode.selectAll('circle.grid-circle')
                .data(axisCoord.ticks(5));
            var gridCirclesEnter = gridCircles.enter().append('circle')
                .attr({'class': 'grid-circle'});

            gridCircles.attr('r', axisCoord);
            gridCircles.exit().remove();
        }

        function renderTickLabels(axisNode, axisCoord, axisTheta, ticksSuffix) {
            var axis = d3.svg.axis().scale(axisCoord).ticks(5);
            axisNode.call(axis)
                .attr({transform: 'rotate('+ (axisTheta) +')'});
            axisNode.selectAll('.domain').style({fill: 'none', stroke: 'black'});
            axisNode.selectAll('.tick.major text').text(function(d, i){ return this.textContent + ticksSuffix; });
        }

        return instance;

    };


    return Class;

});
