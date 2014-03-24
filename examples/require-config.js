requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.

    baseUrl: './',
    urlArgs: "bust=v162", // use this to force a reload of all js files
    paths: {
        d3                    : '../bower_components/d3/d3',
        accessmaker           : '../bower_components/access-maker/AccessMaker',

        polarplot             : '../lib/PolarPlot',
        polarframe            : '../lib/PolarFrame',
        // scales
        scale                 : '../lib/scale/Scale',
        radialscale           : '../lib/scale/RadialScale',
        angularscale          : '../lib/scale/AngularScale',
        // guides
        radialaxis            : '../lib/guide/RadialAxis',
        angularaxis           : '../lib/guide/AngularAxis',
        // geoms
        polarbar              : '../lib/geom/PolarBar',
        polarpie              : '../lib/geom/PolarPie',
        polardot              : '../lib/geom/PolarDot',
        polarline             : '../lib/geom/PolarLine',
        polararea             : '../lib/geom/PolarArea',
        polarband             : '../lib/geom/PolarBand',
        polarflower            : '../lib/geom/PolarFlower',
        // interactives
        polarhover      : '../lib/interactive/PolarHover',
    },
    shim: {
        d3:     { exports: 'd3' }
    }


});