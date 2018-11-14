this.indiaMap = new Map();
//indiaMap.update(2008);

// Selection Clearing

// let shiftChart = new TrendChart();

// let electoralVoteChart = new ElectoralVoteChart(shiftChart);

//load the data corresponding to all the election years
//pass this data and instances of all the charts that update on year selection to yearChart's constructor
d3.csv("Datasets/matches.csv").then(matchData => {
    let gameTimeline = new GameTimeLine(matchData);
    let teamSelector = new TeamSelector(gameTimeline,matchData);
    teamSelector.update(2008);
    d3.csv("Datasets/SeasonData.csv").then(timelineData => {
        this.timeline = new SeasonTimeline(timelineData,indiaMap,teamSelector);
        this.timeline.update();
    });
    // document.addEventListener("click", function(e) {
    //     e.stopPropagation();
    //     teamSelector.reset(2008);
    //     gameTimeline.reset();
    // });
    // gameTimeline.teamUpdate(2008,"Rajasthan Royals");
});
