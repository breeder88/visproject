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
        this.gameBattingWidth = 600;//gameBattingPlot.node().getBoundingClientRect().width-500;
        this.gameBattingHeight = 400;
        this.gameBowlingWidth = 700;//gameBowlingPlot.node().getBoundingClientRect().width;
        this.gameBowlingHeight = 400;

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

        this.battingPlotGroup = this.battingsvg.append('g')
        this.xRunsAxis = d3.axisBottom().tickFormat(d3.format(".0s"));
        this.xRunAx = this.battingPlotGroup.append("g").classed("x-axis", true)
            .attr("transform", "translate(0," + this.gameBattingHeight + ")");
        
        this.yRunsAxis = d3.axisLeft();
        this.yRunAx = this.battingPlotGroup.append("g").classed("y-axis", true)
            .attr("transform", "translate(" + this.margin.left + ", 0)");

        d3.select('#gameBattingPlot')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);
            
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
        let battingWidth = this.gameBattingWidth
        let battingHeight = this.gameBattingHeight
        let battingPlotGroup = this.battingPlotGroup
        let battingsvg = this.battingsvg
        function tooltipRender(data) {
            let text = "<h2>Player Name: "+ data.playerName +"<p>Runs: "+ data.runs +"</p><p>Strike Rate: " + data.strikeRate + "</p><p>Balls: " + data.balls + "</p><p>Team: " + data.team + "</p></h2>";
            return text;
        }
        function updateGameOverview(gameData,selectedGame){
            battingsvg.append("path")
                .classed("runsPathTeam1",true)
            battingsvg.append("path")
                .classed("runsPathTeam2",true)
            let xRunsAxis = d3.axisBottom();
            let xAxisBattingHeight = battingHeight-50
            let xRunAx = battingPlotGroup.append("g").classed("x-axis", true)
                .attr("transform", "translate(0," + xAxisBattingHeight + ")");
            let yRunsAxis = d3.axisLeft();
            let yRunAx = battingPlotGroup.append("g").classed("y-axis", true)
                .attr("transform", "translate(" + margin.left + ", 0)");
            battingPlotGroup.append('text').classed('axis-label-x', true);
            battingPlotGroup.append('text').classed('axis-label-y', true);       
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
                .classed("team1",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Runs: "+selectedGame.firstInnings.batting.runs)
                .attr("y","175")
                .attr("x",gameOverviewWidth/4+75)
                .classed("team1",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Wickets: "+selectedGame.firstInnings.batting.wickets)
                .attr("y","190")
                .attr("x",gameOverviewWidth/4+75)
                .classed("team1",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Run Rate: "+selectedGame.firstInnings.batting.runRate)
                .attr("y","205")
                .attr("x",gameOverviewWidth/4+75)
                .classed("team1",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Overs: "+selectedGame.firstInnings.batting.overs)
                .attr("y","220")
                .attr("x",gameOverviewWidth/4+75)
                .classed("team1",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Second to bat: "+selectedGame.secondInnings.batting.team)
                .attr("y","160")
                .attr("x",3*gameOverviewWidth/4+75)
                .classed("team2",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Runs: "+selectedGame.secondInnings.batting.runs)
                .attr("y","175")
                .attr("x",3*gameOverviewWidth/4+75)
                .classed("team2",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Wickets: "+selectedGame.secondInnings.batting.wickets)
                .attr("y","190")
                .attr("x",3*gameOverviewWidth/4+75)
                .classed("team2",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Run Rate: "+selectedGame.secondInnings.batting.runRate)
                .attr("y","205")
                .attr("x",3*gameOverviewWidth/4+75)
                .classed("team2",true)
                .style("text-anchor", "middle");
            timelineText.append("tspan")
                .text("Overs: "+selectedGame.secondInnings.batting.overs)
                .attr("y","220")
                .attr("x",3*gameOverviewWidth/4+75)
                .classed("team2",true)
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
                player.size = "normal"
                index = index+1
            })
            let runsDataTeam2 = selectedGame.secondInnings.batting.players
            index=0
            runsDataTeam2.forEach(player=>{
                player.teamNumber = "team2"
                player.team = selectedGame.secondInnings.batting.team
                player.number = index
                player.size = "normal"
                if(runsDataTeam1[index]!==undefined){
                    if(runsDataTeam1[index].runs === player.runs) runsDataTeam1[index].size = "big"
                }
                index = index+1
            })

            let runsData = runsDataTeam1.concat(runsDataTeam2)
            let maxPlayers = runsDataTeam1.length
            if(maxPlayers<runsDataTeam2.length) maxPlayers = runsDataTeam2.length
            let maxRuns = 0
            runsData.forEach(player=>{
                if(parseInt(player.runs)>parseInt(maxRuns)) maxRuns=player.runs
            })
            let xRunScale = d3.scaleLinear()
                       .range([margin.left, battingWidth-50])
                       .domain([0,maxPlayers-1])
                        .nice();
            let yRunScale = d3.scaleLinear()
                       .range([margin.top, battingHeight-50])
                       .domain([maxRuns,0])
                       .nice();               
            xRunsAxis.scale(xRunScale);
            yRunsAxis.scale(yRunScale);
            let axisXLabel = d3.select('.axis-label-x')
                .text("Player Number")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + (battingWidth / 2) + ', ' + (battingHeight-5) + ')');
            let axisYLabel = d3.select('.axis-label-y')    
                .text("Runs")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + (margin.left / 2 ) + ', ' + (battingHeight / 2) + ')rotate(-90)');        
        
            d3.select(".x-axis").call(xRunsAxis.ticks(maxPlayers));
            d3.select(".y-axis").call(yRunsAxis);
            
            let runsPlot = battingsvg.selectAll("circle").data(runsData);
            runsPlot.exit()
                .remove();        
            let runsPlotEnter = runsPlot.enter().append("circle");
            runsPlot = runsPlot.merge(runsPlotEnter);
            runsPlot.attr("cx", d=>xRunScale(d.number))
                .attr("cy", d=>yRunScale(d.runs))
                .attr("r", d=>{
                    if(d.size==="big") return 10
                    else return 5
                })
                .attr("class",d=>d.teamNumber)
                .on("mouseover", d=>{
                    runsPlot.selectAll("circle").filter(circ => circ==d).classed("highlighted",true);
                    d3.select(".tooltip").html(tooltipRender(d) + "<br/>")
                        .style("left", d3.event.pageX-75 + "px")
                        .style("top", d3.event.pageY + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", d=>{
                    runsPlot.selectAll("circle").filter(circ => circ==d).classed("highlighted",false);
                    d3.select(".tooltip").style("opacity",0);
                })
            let battingLineGenerator = d3.line()
                .x((d) => xRunScale(d.number))
                .y((d) => yRunScale(d.runs));


            let runsPlotTeam1 = battingsvg.select(".runsPathTeam1").data(runsDataTeam1);
            runsPlotTeam1.exit()
                .remove();        
            let runsPlotEnterTeam1 = runsPlot.enter().append("path")
                .classed("runsPathTeam1",true);
            runsPlotTeam1 = runsPlotTeam1.merge(runsPlotEnterTeam1);
            runsPlotTeam1.attr("d", battingLineGenerator(runsDataTeam1));

            let runsPlotTeam2 = battingsvg.select(".runsPathTeam2").data(runsDataTeam2);
            runsPlotTeam2.exit()
                .remove();        
            let runsPlotEnterTeam2 = runsPlot.enter().append("path")
                .classed("runsPathTeam2",true);
            runsPlotTeam2 = runsPlotTeam2.merge(runsPlotEnterTeam2);
            runsPlotTeam2.attr("d", battingLineGenerator(runsDataTeam2));
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
        this.battingsvg.selectAll("circle")
            .remove()
        this.battingsvg.selectAll("text")
            .remove()
        this.battingsvg.select(".x-axis")
            .remove()
        this.battingsvg.select(".y-axis")
            .remove()   
        this.battingsvg.selectAll("path")
            .remove()
    }
}
