class BirdsView{
	constructor(hometownData,rankings){
		this.hometownData = hometownData;
		this.rankings = rankings;
		this.hometowns = {
			"Sunrisers Hyderabad":["Hyderabad","Visakhapatnam","Cuttack","Nagpur"],
			"Chennai Super Kings":["Chennai","Ranchi"],
			"Delhi Daredevils":["Delhi","Raipur"],
			"Kings XI Punjab":["Chandigarh","Indore","Pune","Dharamsala"],
			"Kolkata Knight Riders":["Kolkata"],
			"Mumbai Indians":["Mumbai"],
			"Rajasthan Royals":["Jaipur","Ahmedabad"],
			"Royal Challengers Bangalore":["Bangalore"],
		};
		this.codes = {
			"Sunrisers Hyderabad":"SRH",
			"Chennai Super Kings":"CSK",
			"Delhi Daredevils":"DD",
			"Kings XI Punjab":"KXIP",
			"Kolkata Knight Riders":"KKR",
			"Mumbai Indians":"MI",
			"Rajasthan Royals":"RR",
			"Royal Challengers Bangalore":"RCB",
		}
        let chart = d3.select("#won-lost");
        //fetch the svg bounds
        this.svgWidth = 500;
        this.svgHeight = 500;

        //add the svg to the div
        this.svg = chart.append("svg")
        		.attr("transform","translate(0,50)")
			   .attr("width",this.svgWidth)
			   .attr("height",this.svgHeight);
	}
	deriveData(){
		console.log("hometownData: ",this.hometownData);
		console.log("rankings: ",this.rankings);
		var teams = [];
		for(var row of this.hometownData){
			teams = teams.concat(row["winner"]);
		}
		var cities = [];
		for(var row of this.hometownData){
			cities = cities.concat(row["city"]);
		}
		console.log("teams: ",teams);
		console.log("cities: ",cities);
		var dTeams = [...new Set(teams)];
		console.log("distinct teams: ",dTeams);
		var dCities = [...new Set(cities)];
		console.log("distinct cities: ",dCities);
		var data = [];
		for(let team of dTeams){
			let teamData = this.hometownData.filter(d => d["winner"]===team);
			var totalGames = 0;
			for(let data of teamData){
				totalGames += +data["count"];
			}
			console.log(totalGames);
			//filter homegames 
			var won = 0;
			for(let home of this.hometowns[team]){
				var wonData = teamData.filter(d => d["city"]===home);
				for(let t of wonData)
					won += +t["count"];
			}
			var lost = totalGames - won;
			var obj = {
				"team":team,
				"won":won,
				"lost":lost,
			};
			data = data.concat(obj);
		}
		console.log("data: ",data);
		return data;

	}
	createComparisionChart(){
		let tooltip = d3.select(".tooltip");
		var data = this.deriveData();
		console.log("data: ",data);
		var xScale = d3.scalePoint()
					   .domain(Object.values(this.codes))
					   .range([0,this.svgWidth])
					   //.padding(2);
		var yScale = d3.scaleLinear()
					   .domain([0,150])
					   .range([this.svgHeight,0]);
	    var xAxis = d3.axisBottom();
	    var yAxis = d3.axisLeft();
	    var wonG = this.svg.append('g')
	    				.attr("transform","translate(50,"+this.svgHeight+") scale(1,-1)")
	    var wonRects = wonG.selectAll("rect")
					        .data(data)
					        .enter()
					        .append("rect")
	         				.attr("x",(d,i)=>i*50+20)
	         				.attr("y",d=>50)
	         				.attr("width",d=>20)
	         				.attr("height",d=>yScale(d.won))
	         				.attr("fill","#d12525")
	         				.on("mouseover",d => {
                   				 tooltip.html(this.tooltipRender(d))
                           				.style("left", d3.event.pageX + "px")
                           				.style("top", d3.event.pageY + "px")
                           				.style("opacity", 1);
	         				})
	         				.on("mouseout",d => {
	         					tooltip.style("opacity",0);
	         				});

	    var lostG = this.svg.append('g')
	    				.attr("transform","translate(50,"+this.svgHeight+") scale(1,-1)")
	    var lostRects = lostG.selectAll("rect")
					        .data(data)
					        .enter()
					        .append("rect")
	         				.attr("x",(d,i)=>i*50+20)
	         				.attr("y",d=>50)
	         				.attr("width",d=>20)
	         				.attr("height",d=>yScale(d.won+d.lost))
	         				.attr("fill","#6ab5fc")
	         				.on("mouseover",d => {
                   				 tooltip.html(this.tooltipRender(d))
                           				.style("left", d3.event.pageX + "px")
                           				.style("top", d3.event.pageY + "px")
                           				.style("opacity", 1);
	         				})
	         				.on("mouseout",d => {
	         					tooltip.style("opacity",0);
	         				});
	    xAxis.scale(xScale);
	    yAxis.scale(yScale);
	    var margin = 30;
	    this.svg.append("g")
    		 .attr("transform", "translate(50,450)")
    		 .attr("class","axis")
    		 .call(xAxis);
    
		this.svg.append("g")
    		 .attr("transform", "translate(50,-50)")
    		 .attr("class","axis")
    		 .call(yAxis);

		
	}
	    tooltipRender(data){
	    	console.log(data);
	    	return "<h3>"+data["team"]+"</h3>"+"<p> Won: "+data["won"]
	    	+"<br />Lost: "+data["lost"]+"</p>";

    }
}