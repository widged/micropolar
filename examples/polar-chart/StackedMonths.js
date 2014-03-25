define([], function() {

    var Class = function PolarStackedMonths() {};

    Class.preset = {
        frame: {height: 250, width: 250, margin: 0, radius: 115, originTheta: -90},
        angular: {domain: [0, 12], range: null, ticks: { major: ['Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar'] } },
        radial: {domain : [0,1200], range: null, ticks: {showCircle: true, axisTheta: -30} }
    };

    Class.stackedSeriesFromTable = function(data, getData, getCategory, config) {

        var categories = [];
        var dataPoints = [];
        data.forEach(function(item, i) {
            var cat = getCategory(item);
            var catId = categories.indexOf(cat);
            if(catId === -1) { catId = categories.length; categories.push(cat); }
            if(!dataPoints[catId]) { dataPoints[catId] = []; }
            dataPoints[catId].push(getData(item));
        });

        dataPoints.forEach(function(rows, catId) {
            if(catId === 0 ) { return ; }
            for(var i = 0, ni = rows.length; i < ni; i++) {
                rows[i] += dataPoints[catId-1][i];
            }
        });

        var series = dataPoints.map(function(rows, catId) {
            for(var i = 0, ni = rows.length; i < ni; i++) {
                var value = rows[i];
                rows[i] = [i, value];
            }
            return { data: rows, className: categories[catId], factory: config.factory };
        });

        var invertedSeries =[], i = series.length;
        while(--i >= 0) {
            invertedSeries.push(series[i]);
        }

        return invertedSeries;
    };

    return Class;

});

