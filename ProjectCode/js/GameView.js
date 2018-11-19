class GameView {

    /**
     * Constructor for the Game View
     */
    constructor (playerData) {        
        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let gameOverview = d3.select("#gameOverview")
        let gameBattingPlot = d3.select("#gameBattingPlot")
        let gameBowlingPlot = d3.select("#gameBowlingPlot") 

        //fetch the svg bounds
        this.gameOverviewWidth = gameOverview.node().getBoundingClientRect().width;
        this.gameOverviewHeight = 225;
        this.gameBattingWidth = gameBattingPlot.node().getBoundingClientRect().width;
        this.gameBattingHeight = 800;
        this.gameBowlingWidth = gameBowlingPlot.node().getBoundingClientRect().width;
        this.gameBowlingHeight = 150;

        //add the svg to the div
        this.overviewsvg = gameOverview.append("svg")
            .attr("width", this.gameOverviewWidth)
            .attr("height", this.gameOverviewHeight)
        this.battingsvg = gameBattingPlot.append("svg")
            .attr("width", this.gameBattingWidth)
            .attr("height", this.gameBattingHeight)
        this.bowlingsvg = gameBowlingPlot.append("svg")
            .attr("width", this.gameBowlingWidth)
            .attr("height", this.gameBowlingHeight)

        this.playerData = playerData

        let battingPlotGroup = gameBattingPlot.append('g')
        this.xRunsAxis = d3.axisBottom();
        this.xRunAx = battingPlotGroup.append("g").classed("x-axis", true)
            .attr("transform", "translate(0," + this.gameBattingHeight + ")");
        
        this.yRunsAxis = d3.axisLeft();
        this.yRunAx = battingPlotGroup.append("g").classed("y-axis", true)
            .attr("transform", "translate(" + this.margin.left + ", 0)");
            
        battingPlotGroup.append('text').classed('axis-label-x', true);
        battingPlotGroup.append('text').classed('axis-label-y', true);
    };

    /**
     * 
     */
    update (gameData) {
        //clear other view
        let margin = this.margin
        this.overviewsvg.selectAll("text")
            .remove()
        this.overviewsvg.selectAll("image")
            .remove()
        let overviewsvg = this.overviewsvg
        let gameOverviewWidth = this.gameOverviewWidth
        let battingsvg = this.battingsvg
        let battingWidth = this.gameBattingWidth
        let battingHeight = this.gameBattingHeight
        let xRunsAxis = this.xRunsAxis
        let yRunsAxis = this.yRunsAxis
        function updateGameOverview(gameData,selectedGame){
            console.log(gameData)
            console.log(selectedGame)        
            let timelineText = overviewsvg.append("text")
            timelineText.append("tspan")
                .text("Date: "+selectedGame.date)
                .attr("y","15")
                .attr("x","0")
                .style("text-anchor", "start");
            timelineText.append("tspan")
                .text("Venue: "+selectedGame.stadium)
                .attr("y","30")
                .attr("x","0")
                .style("text-anchor", "start");
            timelineText.append("tspan")
                .text("Toss Winner: "+selectedGame.tossResult)
                .attr("y","45")
                .attr("x",0)
                .style("text-anchor", "start");
            timelineText.append("tspan")
                .text("First to bat: "+selectedGame.firstInnings.batting.team)
                .attr("y","160")
                .attr("x",gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Runs: "+selectedGame.firstInnings.batting.runs)
                .attr("y","175")
                .attr("x",gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Wickets: "+selectedGame.firstInnings.batting.wickets)
                .attr("y","190")
                .attr("x",gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Run Rate: "+selectedGame.firstInnings.batting.runRate)
                .attr("y","205")
                .attr("x",gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Overs: "+selectedGame.firstInnings.batting.overs)
                .attr("y","220")
                .attr("x",gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Second to bat: "+selectedGame.secondInnings.batting.team)
                .attr("y","160")
                .attr("x",3*gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Runs: "+selectedGame.secondInnings.batting.runs)
                .attr("y","175")
                .attr("x",3*gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Wickets: "+selectedGame.secondInnings.batting.wickets)
                .attr("y","190")
                .attr("x",3*gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Run Rate: "+selectedGame.secondInnings.batting.runRate)
                .attr("y","205")
                .attr("x",3*gameOverviewWidth/4+75)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Overs: "+selectedGame.secondInnings.batting.overs)
                .attr("y","220")
                .attr("x",3*gameOverviewWidth/4+75)
                .style("text-anchor", "middle");

            overviewsvg.append("svg:image")
                .attr("xlink:href", `TeamLogos/${selectedGame.firstInnings.batting.team}.png`)
                .attr("width",150)
                .attr("height",150)
                .attr("x",gameOverviewWidth/4)
                .attr("y","0")
            overviewsvg.append("svg:image")
                .attr("xlink:href", `TeamLogos/${selectedGame.secondInnings.batting.team}.png`)
                .attr("width",150)
                .attr("height",150)
                .attr("x",3*gameOverviewWidth/4)
                .attr("y","0")
            
            let runsDataTeam1 = selectedGame.firstInnings.batting.players
            let index=0
            runsDataTeam1.forEach(player=>{
                player.teamNumber = "team1"
                player.team = selectedGame.firstInnings.batting.team
                player.number = index
                index = index+1
            })
            let runsDataTeam2 = selectedGame.secondInnings.batting.players
            index=0
            runsDataTeam2.forEach(player=>{
                player.teamNumber = "team2"
                player.team = selectedGame.secondInnings.batting.team
                player.number = index
                index = index+1
            })
            let runsData = runsDataTeam1.concat(runsDataTeam2)
            let maxPlayers = runsDataTeam1.length
            if(maxPlayers<runsDataTeam2.length) maxPlayers = runsDataTeam2.length
            let maxRuns = 0
            runsData.forEach(player=>{
                if(parseInt(player.runs)>parseInt(maxRuns)) maxRuns=player.runs
            })
            console.log(runsData)
            let xScale = d3.scaleLinear()
                       .range([margin.left, battingWidth])
                       .domain([0,maxPlayers])
                       .nice();
            let yScale = d3.scaleLinear()
                       .range([margin.top, battingHeight])
                       .domain([maxRuns,0])
                       .nice();               
            xRunsAxis.scale(xScale);
            yRunsAxis.scale(yScale);
            
            let runsPlot = battingsvg.selectAll("circle").data(runsData);
            runsPlot.exit()
                .remove();        
            let runsPlotEnter = runsPlot.enter().append("circle");
            runsPlot = runsPlot.merge(runsPlotEnter);
            runsPlot.attr("cx", d=>xScale(d.number))
                .attr("cy", d=>yScale(d.runs))
                .attr("r","10")
                .attr("class",d=>d.teamNumber)
            
        }
        if(gameData.result === "no result"){
            let timelineText = overviewsvg.append("text")
            timelineText.append("tspan")
                .text("No data available")
                .attr("y","150")
                .attr("x",gameOverviewWidth/2)
                .style("text-anchor", "middle");
        }
        else{
            this.foundGameFlag=0
            this.playerData.forEach(game => {
                if(game.firstInnings.batting!==null){
                    if(game.date===gameData.date){
                        if(gameData.team1===game.firstInnings.batting.team){
                            this.selectedGame = game
                            updateGameOverview(gameData,this.selectedGame)
                            this.foundGameFlag=1
                        }
                        else if(gameData.team2===game.firstInnings.batting.team){
                            this.selectedGame = game
                            updateGameOverview(gameData,this.selectedGame)
                            this.foundGameFlag=1
                        }
                    }
                }
            })
        }
        if(this.foundGameFlag===0){
            let timelineText = overviewsvg.append("text")
            timelineText.append("tspan")
                .text("No data available")
                .attr("y","150")
                .attr("x",gameOverviewWidth/2)
                .style("text-anchor", "middle");
        }
    };
    reset(){
        this.overviewsvg.selectAll("text")
            .remove()
        this.overviewsvg.selectAll("image")
            .remove()
    }
}