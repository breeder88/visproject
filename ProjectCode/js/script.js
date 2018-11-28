d3.json('Datasets/PlayerData.json').then( playerData => {
    let gameView = new GameView(playerData);
    d3.csv("Datasets/matches.csv").then(matchData => {
        let gameTimeline = new GameTimeLine(matchData,gameView);
        let teamSelector = new TeamSelector(gameTimeline,matchData,gameView);
        teamSelector.update(2008);
        //get rankings.csv and pass it to Map object constructor
        let indiaMap,table;
        d3.csv("Datasets/rankings.csv").then(rankings =>{
            indiaMap = new Map();
            indiaMap.update("2008",rankings);
            table = new Table();
            table.createTable(rankings);
            table.updateTable("2008",rankings);

        });
        d3.csv("Datasets/SeasonData.csv").then(timelineData => {
            this.timeline = new SeasonTimeline(timelineData,indiaMap,table,teamSelector,gameTimeline,gameView);
            this.timeline.update();
            console.log("Map object: ",indiaMap);
        });

    });
});
