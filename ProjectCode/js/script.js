let indiaMap = new Map();
//indiaMap.update(2008);

// let shiftChart = new TrendChart();

// let electoralVoteChart = new ElectoralVoteChart(shiftChart);

//load the data corresponding to all the election years
//pass this data and instances of all the charts that update on year selection to yearChart's constructor
d3.csv("Datasets/SeasonData.csv").then(timelineData => {
    let timeline = new SeasonTimeline(timelineData,indiaMap);
    timeline.update();
});
d3.csv("Datasets/matches.csv").then(matchData => {
    let gameTimeline = new GameTimeLine(matchData);
    gameTimeline.teamUpdate(2008,"Rajasthan Royals");
});