# micropolar-gg

An adaptation of the micropolar library (https://github.com/biovisualize/micropolar) to implement a grammar of graphics.

##Usage

To try these yourself:

git clone https://github.com/widged/micropolar
cd micropolar
bower install

Then head to micropolar/examples and open index.html in a browser.

## Easy to use

Preconfigured charts are provided in examples/polar-chart. 

    requirejs(['./polar-chart/Line', 'polarline'], function(PolarLine, LineGeom) {
        var data = d3.range(0, 721, 1).map(function(deg, index){ return [deg, index/720*2]; });
        var series = [{data: data, className: 'snail', factory: LineGeom, config: {}}];
        var plot = new PolarPlot();
        plot.config(PolarLine.preset).mountIn(document.querySelector(selector)).series(series);
    });

## Easy to extend

Every chart is composed of a configurable axis and a geometry module. You can easily extend micropolar with new chart types, or gain full control over every parameters, by looking at the chart presets in examples/polar-chart. 

For instance:

    TwelveMonths = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90, innerMargin: 3},
        angular: {domain: [0, 12], range: null, ticks: { major: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'], orientation: 'angular' } },
        radial: {domain : null, range: null, ticks: {showCircle: true, axisTheta: -30} }
    };


## GG?

The GG suffix stands for grammar of graphics. This term was introduced by Wilkinson (2005) as a language for
describing the contents of a graphic. He decomposed a graphic into seven basic elements: Data, Trans, Frame, Scale, Coord, Guide, Graph. 

We used it as an inspiration to isolate these 5 elements:

  * frame: dimensions and spatial configuration. 
  * coordinates: scales to be used on the angular and radial dimensios of a polar graph. 
  * guides: tick marks, labels, and annotations.
  * geoms: geometrical shapes used to plot each data series. 
  * interactives: possible interactive behaviors

First, the coordindate system will be determined using the domain and range values for the different dimensions required. A polar plot depends on a two-dimensional coordinate system in which each point on a plane is determined by a distance from a fixed point (radial scale) and an angle from a fixed direction (angular scale).

If no valid domain and range values have been in the preset, they will be interpolated from the data distribution and the plot dimensions.  

  var scaleA  = AngularScale.scale(angular.domain, angular.range);
  var scaleR  = RadialScale.scale(radial.domain, radial.range);

Then, the frame (dimensions) and scale data will be used to configure the various elements of a graph, guides, geoms, and interactive behaviours. 

  * plot.addGuide(axisA);
  * plot.addGuide(axisR);
  * plot.addGeom(geomFn, serie.data, serie.className);
  * plot.addInteractive(item);


