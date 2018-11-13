class TeamSelector{
	/**
     * Constructor for the game Timeline
     *
     * @param yearData the year of interest
	 * @param gameData Season game data
     */
    constructor (gameData){
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let timeline = d3.select("#teamSelector");//.classed("sub_content", true);

        //fetch the svg bounds
        this.svgWidth = timeline.node().getBoundingClientRect().width;
        this.svgHeight = 150;

        //add the svg to the div
        this.svg = timeline.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

        this.teamSelectorStart = 100
        this.teamSelectorEnd = this.svgWidth-100
        this.teamSize = 100
        // this.seasonWinners = timelineData;
        // this.map = map;
        // d3.csv("Datasets/rankings.csv").then(rankings => {
        //     this.rankings = rankings;
		// });
		this.games = gameData;       
	};
	update(year){
        let yearGames = this.games.filter(d=>d.season==year);
        let teamsPlaying = [yearGames[0].winner]
		yearGames.forEach(d=>{ //find all teams that played
            teamsPlaying.push(d.winner)
        })
        function arrCondense(a) { //removes duplicate items
            var seen = {};
            return a.filter(function(item) {
                return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
        }
        teamsPlaying=arrCondense(teamsPlaying)
		let teamScale = d3.scaleLinear()
			.range([this.teamSelectorStart, this.teamSelectorEnd])
			.domain([0,teamsPlaying.length-1]);

		let teamIcons = this.svg.selectAll("image")
			.data(teamsPlaying);
		teamIcons.exit()
			.remove();
		let teamIconsEnter = teamIcons.enter().append("svg:image")
		teamIcons = teamIconsEnter.merge(teamIcons)
		teamIcons.attr("xlink:href", d=>`TeamLogos/${d}.png`)
            .attr("width",this.teamSize)
            .attr("height",this.teamSize)
            .attr("x",(d,i)=>teamScale(i)-this.teamSize/2)
            .attr("y",this.teamSize/2);

		this.svg.append("line")
            .attr("y1",this.svgHeight/2)
            .attr("y2",this.svgHeight/2)
            .attr("x1",this.timelineStart)
            .attr("x2",this.timelineEnd)
			.classed("lineChart",true); 
	};
}