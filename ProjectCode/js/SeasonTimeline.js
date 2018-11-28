class SeasonTimeline {
    /**
     * Constructor for the Season Timeline
     *
     * @param timelineData Season winner data
     */
    constructor (timelineData,map,table,teamSelector,gameTimeline,gameView){
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let timeline = d3.select("#seasonTimeline");//.classed("sub_content", true);

        //fetch the svg bounds
        this.svgWidth = timeline.node().getBoundingClientRect().width;
        this.svgHeight = 180;

        //add the svg to the div
        this.svg = timeline.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);

        this.seasonWinners = timelineData;
        this.map = map;
        this.table = table;
        this.teamSelector=teamSelector;
        this.gameTimeline=gameTimeline;
        this.gameView=gameView;
        d3.csv("Datasets/rankings.csv").then(rankings => {
            this.rankings = rankings;
        });
       
    };

    update() {
        this.svg.append("line")
            .attr("y1",this.svgHeight/2)
            .attr("y2",this.svgHeight/2)
            .attr("x1","100")
            .attr("x2",this.svgWidth-100)
            .classed("lineChart",true);

        let that = this;

        this.svg.selectAll("image")
            .data(this.seasonWinners)
            .enter()
            .append("svg:image")
            .attr("xlink:href", d=>`TeamLogos/${d.Team}.png`)
            .attr("width",150)
            .attr("height",150)
            .attr("id",d => d.Year)
            .attr("x",(d,i)=>i*this.svgWidth/9+50)
            .attr("y","10")
            .on("mouseover", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",true);
            })
			.on("mouseout", d=>{
                this.svg.selectAll("image").filter(img => img==d).classed("highlighted",false);
            })
            .on("click", d=>{
                this.teamSelector.reset(d.year);
                this.teamSelector.update(d.Year);
                this.gameTimeline.reset();
                this.gameView.reset();
                that.map.update(d.Year,that.rankings);
                that.table.updateTable(d.Year,that.rankings);
            });
        let timelineText = this.svg.selectAll("text")
            .data(this.seasonWinners)
            .enter()
            .append("text")
            
        timelineText.append("tspan")
            .text(d=>d.Team)
            .attr("y","170")
            .attr("x",(d,i)=>i*this.svgWidth/9+125)
            .style("text-anchor", "middle");

        timelineText.append("tspan")
            .text(d=>d.Year)
            .attr("y","11")
            .attr("x",(d,i)=>i*this.svgWidth/9+125)
            .style("text-anchor", "middle");
    };
    updateHighlight(){

    }
}
