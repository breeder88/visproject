class TeamSelector{
	/**
     * Constructor for the game Timeline
     *
     * @param yearData the year of interest
	 * @param gameData Season game data
     */
    constructor (gameTimeline,gameData,gameView){
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let timeline = d3.select("#teamSelector");//.classed("sub_content", true);

        //fetch the svg bounds
        this.svgWidth = timeline.node().getBoundingClientRect().width;
        this.svgHeight = 150;
        this.gameTimeline=gameTimeline
        this.gameView=gameView

        //add the svg to the div
        this.svg = timeline.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

        this.teamSelectorStart = 100
        this.teamSelectorEnd = this.svgWidth-100
        this.teamSize = 100
        this.games = gameData;
        this.buttonRadius=10       
        this.buttonX=75
        this.buttonY=10
        this.buttonLabelX=90
        this.buttonLabelY=15
        this.codes = {
            "Rajasthan Royals":"RR",
            "Deccan Chargers":"DC",
            "Sunrisers Hyderabad":"SRH",
            "Kings XI Punjab":"KXIP",
            "Delhi Daredevils":"DD",
            "Mumbai Indians":"MI",
            "Rising Pune Supergiants":"RPS",
            "Pune Warriors India":"PWI",
            "Kochi Tuskers Kerala":"KTK",
            "Gujarat Lions":"GL",
            "Royal Challengers Bangalore":"RCB",
            "Chennai Super Kings":"CSK",
            "KKR":"Kolkata Knight Riders",
        };
        d3.select('#teamSelector')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style('z-index', 9999)
            .attr("id","teamSelectorTooltip");
	};
	update(year){
        this.svg.selectAll("text").remove()
        let yearGames = this.games.filter(d=>d.season==year);
        let teamsPlaying = []
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
        if(teamsPlaying[teamsPlaying.length-1]==""){ //hacky way of fixing bug that allows empty elements at the end of the array sometimes
            teamsPlaying.pop()
        }
		let teamScale = d3.scaleLinear()
			.range([this.teamSelectorStart, this.teamSelectorEnd])
			.domain([0,teamsPlaying.length-1]);

		let teamIcons = this.svg.selectAll("image")
			.data(teamsPlaying);
		teamIcons.exit()
			.remove();
		let teamIconsEnter = teamIcons.enter().append("svg:image")
        teamIcons = teamIconsEnter.merge(teamIcons)
        let tooltip = d3.select("#teamSelectorTooltip");
		teamIcons.attr("xlink:href", d=>`TeamLogos/${d}.png`)
            .attr("width",this.teamSize)
            .attr("height",this.teamSize)
            .attr("x",(d,i)=>teamScale(i)-this.teamSize/2)
            .attr("y",this.teamSize/2)
            .on("mouseover", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",true);
                tooltip.html(this.tooltipRender(d) + "<br/>")
                    .style("left", d=>{
                        return d3.event.target.x.baseVal.value-75+"px"
                    })//d3.event.pageX-75 + "px")
                    .style("top", d=>{
                        return d3.event.target.y.baseVal.value+100+"px"
                    })//d3.event.pageY + "px")
                    .style("opacity", 1);
            })
			.on("mouseout", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",false);
                tooltip.style("opacity",0);
            })
            .on("click", d=>{
                this.selectedTeam(year,d);
                tooltip.style("opacity",0);
                console.log(d)
                this.gameTimeline.teamUpdate(year,d);
                this.gameView.reset();
            });    
            let teamSelectText = this.svg.append("text")
            teamSelectText.append("tspan")
                .text("Season: "+year)
                .attr("y","15")
                .attr("x",this.svgWidth/2+this.teamSize/2)
                .style("text-anchor", "middle")
                .classed("text",true);
    };
    selectedTeam(year,teamName){
        this.svg.selectAll("image").remove()
        let resetButton=this.svg.append("circle")
        resetButton.attr("r",this.buttonRadius)
            .attr("cx", this.buttonX)
            .attr("cy", this.buttonY)
            .classed("button",true)
            .on("mouseover", d=>{
                this.svg.selectAll("circle").filter(img => img==d).classed("highlightedButton",true);
            })
			.on("mouseout", d=>{
                this.svg.selectAll("circle").filter(img => img==d).classed("highlightedButton",false);
            })
            .on("click", d=>{
                this.gameTimeline.reset();
                this.reset(year);
                this.gameView.reset();
            });
        let buttonLabel=this.svg.append("text")
        buttonLabel.text("Pick Another Team")
            .attr("x",this.buttonLabelX)
            .attr("y",this.buttonLabelY)
            .classed("text",true)
        
        this.svg.append("svc:image")
            .attr("xlink:href", `TeamLogos/${teamName}.png`)
            .attr("width",this.teamSize)
            .attr("height",this.teamSize)
            .attr("x",this.svgWidth/2)
            .attr("y",this.teamSize/2)
        
        this.svg.append("text")
            .text("Viewing games for: " +teamName)
            .attr("x",this.svgWidth/2+this.teamSize/2)
            .attr("y",this.teamSize/2)
            .style("text-anchor", "middle")
            .classed("text",true);
    };
    reset(year){
        this.svg.selectAll("circle").remove()
        this.svg.selectAll("text").remove()
        this.svg.selectAll("image").remove()
		this.update(year)
    };
    tooltipRender(data) {
        let text = "<h2>" + data + "</h2>";
        return text;
    }
}