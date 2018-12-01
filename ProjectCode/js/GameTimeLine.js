class GameTimeLine{
	/**
     * Constructor for the game Timeline
     *
     * @param yearData the year of interest
	 * @param gameData Season game data
     */
    constructor (gameData,gameView){
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let timeline = d3.select("#gamesTimeline");//.classed("sub_content", true);

        //fetch the svg bounds
        this.svgWidth = timeline.node().getBoundingClientRect().width;
        this.svgHeight = 180;

        //add the svg to the div
        this.svg = timeline.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

		this.timelineEnd=this.svgWidth-50
		this.timelineStart=160
		let heightVal=30
		this.winTickHeight=this.svgHeight/2-heightVal
		this.loseTickHeight=this.svgHeight/2+heightVal
		this.iconHeightWin=this.svgHeight/2-80
		this.iconHeightLose=this.svgHeight/2 
		this.teamSize=80
		this.gameView = gameView
		this.games = gameData;       
		d3.select('#gameTimeline')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);
	};
	teamUpdate(year,selectedTeam){
		let yearGames = this.games.filter(d=>d.season==year);
		let filteredTeam1 = yearGames.filter(d=>d.team1==selectedTeam)
		let filteredTeam2 = yearGames.filter(d=>d.team2==selectedTeam)
		let selectedTeamGames = filteredTeam1.concat(filteredTeam2)
		selectedTeamGames = selectedTeamGames.sort(function(a,b){return a.id-b.id})
		selectedTeamGames.forEach(d=>{
			if(d.team1==selectedTeam) d.opposingTeam=d.team2;
			else d.opposingTeam=d.team1;
		})
		let gameScale = d3.scaleLinear()
			.range([this.timelineStart, this.timelineEnd])
			.domain([0,selectedTeamGames.length-1]);

		this.svg.append("line")
			// .attr("y1",this.svgHeight/2)
			// .attr("y2",this.svgHeight/2)
			// .attr("x1",this.timelineStart)
			// .attr("x2",this.timelineStart)
			// .transition()
			// .duration(750)
            .attr("y1",this.svgHeight/2)
            .attr("y2",this.svgHeight/2)
            .attr("x1",this.timelineStart)
            .attr("x2",this.timelineEnd)
			.classed("lineChart",true); 

		let teamTimeline = this.svg.selectAll("ticks")
			.data(selectedTeamGames);
		teamTimeline.exit()
			.remove();    
		let teamTimelineEnter = teamTimeline.enter().append("line")
		teamTimeline = teamTimelineEnter.merge(teamTimeline)	
		
		let timelineText = this.svg.append("text")
		timelineText.append("tspan")
                .text("Selected Team Won")
                .attr("y","45")
				.attr("x","0")

		timelineText.append("tspan")
                .text("Selected Team Lost")
                .attr("y","105")
                .attr("x","0")

		teamTimeline.attr("y1",this.svgHeight/2)
			.attr("y2",d=>{
				if(d.result==="no result"){
					return this.svgHeight/2
				}
				else{
					if(d.winner == selectedTeam){
						return this.winTickHeight
					}
					else{
						return this.loseTickHeight
					}
				}
			})
			.attr("x1",(d,i)=>gameScale(i))
			.attr("x2",(d,i)=>gameScale(i))
			.classed("lineChart",true)
			.classed("ticks",true);

		let teamIcons = this.svg.selectAll("image")
			.data(selectedTeamGames);
		teamIcons.exit()
			.remove();
		let teamIconsEnter = teamIcons.enter().append("svg:image")
		teamIcons = teamIconsEnter.merge(teamIcons)
		let tooltip = d3.select(".tooltip");
		teamIcons.attr("xlink:href", d=>`TeamLogos/${d.opposingTeam}.png`)
            .attr("width",this.teamSize)
            .attr("height",this.teamSize)
            .attr("x",(d,i)=>gameScale(i)-this.teamSize/2)
            .attr("y",d=>{
				if(d.result==="no result"){
					return (this.iconHeightWin+this.iconHeightLose)/2
				}
				else{
					if(d.winner == selectedTeam){
						return this.iconHeightWin
					}
					else{
						return this.iconHeightLose
					}
				}
				
			})
			.on("mouseover", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",true);
                tooltip.html(this.tooltipRender(d) + "<br/>")
                    .style("left", d3.event.pageX-75 + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("opacity", 1);
			})
			.on("mouseout", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",false);
                tooltip.style("opacity",0);
			})
			.on("click", d=>{
				this.gameView.update(d);
				let currImage = this.svg.selectAll("image").filter(img => img==d);
				this.svg.selectAll("rect").remove()
				this.svg.append("rect")
					.attr("x", currImage.attr("x"))
					.attr("y", currImage.attr("y"))
					.attr("width", this.teamSize)
					.attr("height", this.teamSize)
					.style("fill", "none")
					.style("stroke", "black")
					.style("stroke-width","5");
			})
	};
	reset(){
		this.svg.selectAll("line").remove();
		this.svg.selectAll("image").remove();
		this.svg.selectAll("text").remove();
		this.svg.selectAll("rect").remove();
	};
	tooltipRender(data) {
		let text = "<h2>Date: "+ data.date +"<p>Opponent: "+ data.opposingTeam +"</p><p>Tie Game</p><p>Winner: " + data.winner + "</p></h2>";
		if (data.result==="normal"){
			if(data.win_by_runs>0){
				text = "<h2>Date: "+ data.date +"<p>Opponent: "+ data.opposingTeam +"</p><p>Winner: " + data.winner + " by "+ data.win_by_runs+ " runs</p></h2>";
			}
			else{
				text = "<h2>Date: "+ data.date +"<p>Opponent: "+ data.opposingTeam +"</p><p>Winner: " + data.winner + " by "+ data.win_by_wickets+ " wickets</p></h2>";
			}
		}
		if (data.result==="no result"){
			text = "<h2>Date: "+ data.date +"<p>No Result</p></h2>";
		}
        return text;
    }
}