/*jshint strict:false*/
/*global CasperError console phantom require*/
var links = [];
var type = 'equationLine';
var basename = "img_shot/{{type}}.png";

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 300, height: 300}
});


casper.start("http://localhost:8080/polar-d3/examples/index.html?graph=dots");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'dots');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=equationLine");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'equationLine');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=barChart");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'barChart');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=cardinalPie");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'cardinalPie');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=clock");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'clock');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=monthPie");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'monthPie');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=monthArea");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'monthArea');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=monthBar");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'monthBar');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=monthFlower");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'monthFlower');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=microphone");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'microphone');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=nightingale");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'nightingale');
    casper.capture(filename);
}, null, 100000);

casper.thenOpen("http://localhost:8080/polar-d3/examples/index.html?graph=bands");

casper.waitUntilVisible("x-polar-chart", function() {
   var filename = basename.replace('{{type}}', 'bands');
    casper.capture(filename);
}, null, 100000);



casper.run(function() {
    // echo results in some pretty fashion
    this.echo("running");
    this.exit();
});

