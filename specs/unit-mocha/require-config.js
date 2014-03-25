define({
    baseUrl: './',
    nodeRequire: require,
    paths: {
        d3                    : 'd3',
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
        polardot              : '../../lib/geom/PolarDot',
        polarline             : '../lib/geom/PolarLine',
        polararea             : '../lib/geom/PolarArea',
        polarband             : '../lib/geom/PolarBand',
        polarflower            : '../lib/geom/PolarFlower',
        // interactives
        polarhover      : '../lib/interactive/PolarHover',
    }
});