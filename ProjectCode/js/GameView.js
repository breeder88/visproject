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
        this.gameBowlingWidth = 800;//gameBowlingPlot.node().getBoundingClientRect().width;
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
        this.bowlingPlotGroup = this.bowlingsvg.append('g')

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
        let gameBowlingWidth = this.gameBowlingWidth
        let gameBowlingHeight = this.gameBowlingHeight
        let bowlingPlotGroup = this.bowlingPlotGroup
        let bowlingsvg = this.bowlingsvg
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
            let xRunAx = battingPlotGroup.append("g").classed("runs-x-axis", true)
                .attr("transform", "translate(0," + xAxisBattingHeight + ")");
            let yRunsAxis = d3.axisLeft();
            let yRunAx = battingPlotGroup.append("g").classed("runs-y-axis", true)
                .attr("transform", "translate(" + margin.left + ", 0)");
            battingPlotGroup.append('text').classed('runs-axis-label-x', true);
            battingPlotGroup.append('text').classed('runs-axis-label-y', true);       
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
            let axisXLabel = d3.select('.runs-axis-label-x')
                .text("Player Number")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + (battingWidth / 2) + ', ' + (battingHeight-5) + ')');
            let axisYLabel = d3.select('.runs-axis-label-y')    
                .text("Runs")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + (margin.left / 2 ) + ', ' + (battingHeight / 2) + ')rotate(-90)');        
        
            d3.select(".runs-x-axis").call(xRunsAxis.ticks(maxPlayers));
            d3.select(".runs-y-axis").call(yRunsAxis);
            
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

            let bowlDataTeam1 = selectedGame.firstInnings.bowling.players
            index=0
            bowlDataTeam1.forEach(player=>{
                player.teamNumber = "team1"
                player.team = selectedGame.secondInnings.batting.team
                player.number = index
                index = index+1
            })
            let bowlDataTeam2 = selectedGame.secondInnings.bowling.players
            index=0
            bowlDataTeam2.forEach(player=>{
                player.teamNumber = "team2"
                player.team = selectedGame.firstInnings.batting.team
                player.number = index
                index = index+1
            })

            let bowlingData = bowlDataTeam1.concat(bowlDataTeam2)
            console.log(selectedGame)
            let bowlingAxisHeight = gameBowlingHeight-20
            function contstructParallelAxes(bowlingData){
                let maxWickets = 0
                let maxRuns = 0
                let maxEconomy = 0
                let maxOvers = 0
                bowlingData.forEach(player=>{
                    if(player.runs > maxRuns) maxRuns = Number(player.runs)
                    if(player.wickets > maxWickets) maxWickets = Number(player.wickets)
                    if(player.economy > maxEconomy) maxEconomy = Number(player.economy)
                    if(player.overs > maxOvers) maxOvers = Number(player.overs)
                })
                return [maxEconomy,maxRuns,maxWickets,maxOvers]
            }
            let parallelAxes = contstructParallelAxes(bowlingData)
            let parallelEconomy = d3.scaleLinear()
                .range([margin.top, bowlingAxisHeight])
                .domain([parallelAxes[0],0])
                .nice()
            let parallelRuns = d3.scaleLinear()
                .range([margin.top, bowlingAxisHeight])
                .domain([parallelAxes[1], 0])
                .nice()
            let parallelWickets = d3.scaleLinear()
                .range([margin.top, bowlingAxisHeight])
                .domain([parallelAxes[2], 0])
                .nice()
            let parallelOvers = d3.scaleLinear()
                .range([margin.top, bowlingAxisHeight])
                .domain([parallelAxes[3], 0])
                .nice()
            bowlingData.forEach(player=>{
                player.econScale = parallelEconomy
                player.runsScale = parallelRuns
                player.wicketsScale = parallelWickets
                player.oversScale = parallelOvers
            })
            console.log(bowlingData)
            let axisPosition = []
            axisPosition.push(margin.left+100)
            let bowlAxisEconomy = d3.axisRight()
            bowlingPlotGroup.append("g").classed("economy-axis", true)
                .attr("transform", "translate(" + axisPosition[0] + ", 0)");
            bowlingPlotGroup.append('text').classed('economy-label', true);
            bowlAxisEconomy.scale(parallelEconomy);
            d3.select(".economy-axis").call(bowlAxisEconomy)
            let labelHeight = bowlingAxisHeight+17
            let economyLabel = d3.select('.economy-label')
                .text("Economy")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + axisPosition[0] + ', ' + (labelHeight) + ')');

            let bowlAxisRuns = d3.axisRight()
            axisPosition.push(Number(axisPosition)+Number(gameBowlingWidth/4))
            bowlingPlotGroup.append("g").classed("runs-axis", true)
                .attr("transform", "translate(" + axisPosition[1] + ", 0)");
            bowlingPlotGroup.append('text').classed('runs-label', true);
            bowlAxisRuns.scale(parallelRuns)
            d3.select(".runs-axis").call(bowlAxisRuns)
            let runsLabel = d3.select('.runs-label')
                .text("Runs Conceded")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + axisPosition[1] + ', ' + (labelHeight) + ')');
            
            let bowlAxisWickets = d3.axisRight()
            axisPosition.push(Number(axisPosition[1])+Number(gameBowlingWidth/4))
            bowlingPlotGroup.append("g").classed("wickets-axis", true)
                .attr("transform", "translate(" + axisPosition[2] + ", 0)");
            bowlingPlotGroup.append('text').classed('wickets-label', true);
            bowlAxisWickets.scale(parallelWickets)
            d3.select(".wickets-axis").call(bowlAxisWickets.ticks(parallelAxes[2]))
            let wicketsLabel = d3.select('.wickets-label')
                .text("Wickets Taken")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + axisPosition[2] + ', ' + (labelHeight) + ')');

            let bowlAxisOvers = d3.axisRight()
            axisPosition.push(Number(axisPosition[2])+Number(gameBowlingWidth/4))
            bowlingPlotGroup.append("g").classed("overs-axis", true)
                .attr("transform", "translate(" + axisPosition[3] + ", 0)");
            bowlingPlotGroup.append('text').classed('overs-label', true);
            bowlAxisOvers.scale(parallelOvers)
            d3.select(".overs-axis").call(bowlAxisOvers.ticks(parallelAxes[3]))
            let oversLabel = d3.select('.overs-label')
                .text("Overs Bowled")
                .style("text-anchor", "middle")
                .attr('transform', 'translate(' + axisPosition[3] + ', ' + (labelHeight) + ')');
            
            bowlingsvg.selectAll(".team1").remove()
            bowlingsvg.selectAll(".team2").remove()
            bowlingData.forEach(player =>{
                
                bowlingsvg.append("line")
                    .attr("y1",parallelEconomy(player.economy))
                    .attr("y2",parallelRuns(player.runs))
                    .attr("x1",axisPosition[0])
                    .attr("x2",axisPosition[1])
                    .attr("class", player.teamNumber)
                bowlingsvg.append("line")
                    .attr("y1",parallelRuns(player.runs))
                    .attr("y2",parallelWickets(player.wickets))
                    .attr("x1",axisPosition[1])
                    .attr("x2",axisPosition[2])
                    .attr("class", player.teamNumber)
                bowlingsvg.append("line")
                    .attr("y1",parallelWickets(player.wickets))
                    .attr("y2",parallelOvers(player.overs))
                    .attr("x1",axisPosition[2])
                    .attr("x2",axisPosition[3])
                    .attr("class", player.teamNumber)
            })
            
            // parallelX.domain(["economy","runs","overs","wickets"])
            // console.log(parallelX("economy"))
            // parallelX.domain(dimensions = (bowlingData).filter(d=> {
            //     console.log(d)
            //     return d != "name" && (parallelY[d] = d3.scaleLinear()
            //         .domain(d3.extent(bowlingData, function(p) { return +p[d]; }))
            //         .range([gameBowlingHeight, 0]));
            //   }));
        }
        if(gameData.result === "no result"){
            let timelineText = overviewsvg.append("text")
            timelineText.append("tspan")
                .text("No data available")
                .attr("y","150")
                .attr("x",gameOverviewWidth/2)
                .style("text-anchor", "middle");

            this.battingsvg.selectAll("circle")
                .remove()
            this.battingsvg.selectAll("text")
                .remove()
            this.battingsvg.select(".runs-x-axis")
                .remove()
            this.battingsvg.select(".runs-y-axis")
                .remove()   
            this.battingsvg.selectAll("path")
                .remove()
            
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

            this.battingsvg.selectAll("circle")
                .remove()
            this.battingsvg.selectAll("text")
                .remove()
            this.battingsvg.select(".runs-x-axis")
                .remove()
            this.battingsvg.select(".runs-y-axis")
                .remove()   
            this.battingsvg.selectAll("path")
                .remove()
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
        this.battingsvg.select(".runs-x-axis")
            .remove()
        this.battingsvg.select(".runs-y-axis")
            .remove()   
        this.battingsvg.selectAll("path")
            .remove()
    }
}
