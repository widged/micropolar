define(['d3', 'accessmaker'], function(d3, AccessMaker) {

    var FN = {};

    var Class = function AngularGuide() {

        var instance = this;

        var state = {
            scale: null,
            frame: null,
            ticks: null,
        };

        AccessMaker.allKeys(state, instance, []);
        AccessMaker.addConfig(state, instance);

        instance.mountIn = function(rootNode) {

            var scale        = state.scale;
            var frame        = state.frame;
            var ticks        = state.ticks;

            var originTheta  = frame.originTheta;
            var radius       = frame.radius;

            var axisNode = rootNode.select('.angular.axis');

            var currentAngle = function(d, i){
                return (scale(d.value) + originTheta) % 360;
            };

            if(!ticks.data) { ticks.data =  Class.ticks(ticks); }
            renderMarks(axisNode, ticks, currentAngle, radius);
            renderLabels(axisNode, ticks, currentAngle, radius);

            axisNode.select('circle.outside-circle').attr({r: radius});

            return instance;
        };



        function renderMarks(axisNode, config, currentAngle, radius) {
            var data          = config.data;
            var lengthSpan    = config.lengthSpan || [0, radius];



            var ticks = axisNode.selectAll('g.angular-tick').data(data);
            var angularAxisEnter = ticks.enter().append('g')
                .attr({
                    'class': 'angular-tick',
                    transform: function(d, i) {
                        var t = 'rotate(' + currentAngle(d, i) + ')';
                        return t;
                    }
                });
            ticks.exit().remove();

            angularAxisEnter.append('line')
                .classed('grid-line', true)
                .classed('major', function(d, i){ return d.isMajor; })
                .classed('minor', function(d, i){ return !d.isMajor; });


            axisNode.selectAll('line.grid-line')
                .attr({
                    x1: lengthSpan[0],
                    x2: lengthSpan[1]
                });

        }

        function renderLabels(axisNode, config, currentAngle, radius) {
            var labelOffset   = config.labelOffset || 6;
            var orient        = config.orientation || 'angular'; // 'radial', 'angular', 'horizontal'

            var x             = radius + (labelOffset || 0);


            axisNode.selectAll('g.angular-tick')
                .append('text')
                .attr({
                    'class': 'axis-text',
                    x: x,
                    dy: '.35em',
                    transform: function(d, i) {
                        var angle = currentAngle(d, i);
                        var rad = x;
                        var t;
                        if(orient == 'horizontal') {
                            t= 'rotate(' + (-angle) + ' ' + rad + ' 0)';
                        } else if(orient == 'radial') {
                            t= (angle < 270 && angle > 90) ? 'rotate(180 ' + rad + ' 0)' : null;
                        } else {
                            t= 'rotate('+ ((angle <= 180 && angle > 0) ? -90 : 90) +' ' + rad + ' 0)';
                        }
                        return t;
                    }
                })
                .style({'text-anchor': 'middle' })
                .text(function(d, i) { return d.text;  });

        }

        return instance;

    };

    Class.ticks = function(config) {
        var majorSuffix = config.majorSuffix || '',
            majorFmt = config.majorFmt || function(value) { return value; },
            minorFmt = config.minorFmt || function(value) { return ''; },
            minorQty = config.minorQty || 0,
            majorQty = config.majorQty || 4,
            majorFn = function(d, i) { return getMajor(i, i); },
            minorFn = function(d, i) { return getMinor(d, i); };


        function getMajor(text, value) {
            if(value === undefined) { value = text; }
            return {text: majorFmt(text) + majorSuffix, value: value };
        }

        function getMinor(text, value) {
            if(value === undefined) { value = text; }
            return {text: minorFmt(text), value: value };
        }

        if(config.major) {
            var labels = config.major;
            majorFn = function(d, i) { return getMajor(labels[d], i); };
            majorQty = labels.length;
        }

        if(config.perimeter) {
            config.majorStep  = config.perimeter / majorQty;
            if(minorQty > 0) { config.minorStep = config.perimeter / (majorQty * (1+minorQty)); }
        }

        if(config.majorStep) {
            var stepM = config.majorStep;
            majorFn = function(d, i) {
                return getMajor(stepM * d);
            };
        }
        if(config.minorStep) {
            var stepm = config.minorStep;
            minorFn = function(d, i) {
                return getMinor(stepm * i);
            };
        }

        var minor = [];
        for(var j = 0, nj = minorQty; j < nj; j++) {
            minor.push('x');
        }

        var all = [];
        for(var i = 0, ni = majorQty; i < ni; i++) {
            all.push(i);
            all = all.concat(minor);
        }

        var ticks = all.map(function(d, i) {
            var obj = {};
            if(d+0 === d) {
                obj = majorFn(d, i);
                obj.isMajor = true;
            } else {
                obj = minorFn(d, i);
            }
            if(!obj.hasOwnProperty('value')) { obj.value = i; }
            return obj;
        });

        return ticks;
    };

    return Class;

});
