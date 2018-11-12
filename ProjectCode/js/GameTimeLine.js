class GameTimeLine{
	/**
     * Constructor for the game Timeline
     *
     * @param yearData the year of interest
	 * @param gameData Season game data
     */
    constructor (gameData){
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let timeline = d3.select("#gamesTimeline");//.classed("sub_content", true);

        //fetch the svg bounds
        this.svgWidth = timeline.node().getBoundingClientRect().width;
        this.svgHeight = 150;

        //add the svg to the div
        this.svg = timeline.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

		this.timelineEnd=this.svgWidth-25
		this.timelineStart=25
		let heightVal=30
		this.winTickHeight=this.svgHeight/2-heightVal
		this.loseTickHeight=this.svgHeight/2+heightVal
		this.iconHeightWin=this.svgHeight/2-60
		this.iconHeightLose=this.svgHeight/2
		this.teamSize=50
        // this.seasonWinners = timelineData;
        // this.map = map;
        // d3.csv("Datasets/rankings.csv").then(rankings => {
        //     this.rankings = rankings;
		// });
		this.games = gameData;       
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
		console.log(selectedTeamGames)
		let gameScale = d3.scaleLinear()
			.range([this.timelineStart, this.timelineEnd])
			.domain([0,selectedTeamGames.length-1]);

		let teamTimeline = this.svg.selectAll("line")
			.data(selectedTeamGames);
		teamTimeline.exit()
			.remove();    
		let teamTimelineEnter = teamTimeline.enter().append("line")
		teamTimeline = teamTimelineEnter.merge(teamTimeline)		

		teamTimeline.attr("y1",this.svgHeight/2)
			.attr("y2",d=>{
				if(d.winner == selectedTeam){
					return this.winTickHeight
				}
				else{
					return this.loseTickHeight
				}
			})
			.attr("x1",(d,i)=>gameScale(i))
			.attr("x2",(d,i)=>gameScale(i))
			.classed("lineChart",true);

		let teamIcons = this.svg.selectAll("image")
			.data(selectedTeamGames);
		teamIcons.exit()
			.remove();
		let teamIconsEnter = teamIcons.enter().append("svg:image")
		teamIcons = teamIconsEnter.merge(teamIcons)
		teamIcons.attr("xlink:href", d=>`TeamLogos/${d.opposingTeam}.png`)
            .attr("width",this.teamSize)
            .attr("height",this.teamSize)
            .attr("x",(d,i)=>gameScale(i)-this.teamSize/2)
            .attr("y",d=>{
				if(d.winner == selectedTeam){
					return this.iconHeightWin
				}
				else{
					return this.iconHeightLose
				}
			});

		this.svg.append("line")
            .attr("y1",this.svgHeight/2)
            .attr("y2",this.svgHeight/2)
            .attr("x1",this.timelineStart)
            .attr("x2",this.timelineEnd)
			.classed("lineChart",true); 
	};
}