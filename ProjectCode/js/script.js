// let tileChart = new TileChart();

// let shiftChart = new TrendChart();

// let electoralVoteChart = new ElectoralVoteChart(shiftChart);

//load the data corresponding to all the election years
//pass this data and instances of all the charts that update on year selection to yearChart's constructor
d3.csv("Datasets/SeasonData.csv").then(timelineData => {
    let timeline = new SeasonTimeline(timelineData);
    timeline.update();
});