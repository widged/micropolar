# micropolar-gg

An adaptation of the micropolar library (https://github.com/biovisualize/micropolar) to implement a grammar of graphics.

##Usage

Download it or link to it:

```html
<script type='text/javascript' src="http://micropolar.org/micropolar.js"></script>
```

Preconfigured charts are provided in examples/polar-chart. 

    requirejs(['./polar-chart/Line', 'polarline'], function(PolarLine, LineGeom) {
        var data = d3.range(0, 721, 1).map(function(deg, index){ return [deg, index/720*2]; });
        var series = [{data: data, className: 'snail', factory: LineGeom, config: {}}];
        var plot = new PolarPlot();
        plot.config(PolarLine.preset).mountIn(document.querySelector(selector)).series(series);
    });

## Easy to extend

Every chart is composed of a very configurable axis and a geometry module. The current chart types are linePlot, dotPlot, barChart, areaChart and clock. You can easily extend micropolar with new chart types, or gain full control over every parameters, by looking at these factory implementations. 





## GG?

The GG suffix stands for grammar of graphics. This term was introduced by Wilkinson (2005) as a language for
describing the contents of a graphic. He decomposed a graphic into seven basic
elements:
  * DATA Functions that create variables from data. We often do not need to specify
any function (aside from the identity) if the data are in a data frame.
  * TRANS Transformations, if any, to be applied to the variables, e.g. percentile
rank, log, inverse of normal CDF, cut/group, etc.
  * FRAME Algebraic expression that deﬁnes the frame. A one-dimensional frame is
typically speciﬁed by a single variable, e.g. x. A two dimensional frame
by x*y, where * is interpreted as “cross” or “by” or “Cartesian product.”
Other symbols include, + which stands for “blend” or “union”, and /
which denotes stratiﬁcation or nesting.
  * SCALE Dimensions on which the graphics orient themselves, such as categorical,
interval, log, and power. In addition, the scale contains information about
tick mark locations and format (e.g. scientiﬁc notation).
  * COORD Coordinate system to use, such as polar and cartesian, plus, if needed,
information about how to reﬂect, rotate, stretch, dilate, and translate.
  * GUIDE Guiding notation such as axes, legends, markers, etc.
  * GRAPH Graphing functions to appear in the frame. Simple examples include, point
and line.

In this library, we used Wilkinson's work as inspiration to isolate these 5 elements:

  * frame: dimensions and spatial configuration. 
  * coordinates: scales to be used on the angular and radial dimensios of a polar graph. 
  * guides: tick marks, labels, and annotations.
  * geoms: geometrical shapes used to plot each data series. 
  * interactives: possible interactive behaviors

A plot is constructed by importing some plot presets:

    TwelveMonths = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90, innerMargin: 3},
        angular: {domain: [0, 12], range: null, ticks: { major: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'], orientation: 'angular' } },
        radial: {domain : null, range: null, ticks: {showCircle: true, axisTheta: -30} }
    };

And using them to configure a PolarPlot instance. 

First, the coordindate system will be determined using the domain and range values for the different dimensions required. A polar plot depends on a two-dimensional coordinate system in which each point on a plane is determined by a distance from a fixed point (radial scale) and an angle from a fixed direction (angular scale).

If no valid domain and range values have been in the preset, they will be interpolated from the data distribution and the plot dimensions.  

  var scaleA  = AngularScale.scale(angular.domain, angular.range);
  var scaleR  = RadialScale.scale(radial.domain, radial.range);

Then, the frame (dimensions) and scale data will be used to configure the various elements of a graph, guides, geoms, and interactive behaviours. 

  * plot.addGuide(axisA);
  * plot.addGuide(axisR);
  * plot.addGeom(geomFn, serie.data, serie.className);
  * plot.addInteractive(item);


