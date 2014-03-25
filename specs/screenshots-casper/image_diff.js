#!/usr/bin/env node

var chai     = require('chai'),
    expect   = chai.expect,
    path     = require('path'),
	resemble = require('chai-resemble'),
    tolerance = 0.4;

chai.use(resemble);

describe("chai-resemble", function () {
    it('Should resemble the original', function (done) {
        expect('http://google.com').to.resemble('http://google.com', tolerance, done);
        // Tolerance argument is optional, it defaults to 0
        expect('http://google.com').to.resemble('http://google.com', done);
    });
});