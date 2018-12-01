class Table{
	//season-wise rankings view
	constructor(gameView,gameTimeline,teamSelector){
		//this.rankings = rankings;
		this.names = {
			"KKR":"Kolkata Knight Riders",
			"SRH":"Sunrisers Hyderabad",
			"DC":"Deccan Chargers",
			"CSK":"Chennai Super Kings",
			"DD":"Delhi Daredevils",
			"KXIP":"Kings XI Punjab",
			"MI":"Mumbai Indians",
			"RR":"Rajasthan Royals",
			"RPS":"Rising Pune Supergiants",
			"KTK":"Kochi Tuskers Kerala",
			"PWI":"Pune Warriors",
			"GL":"Gujarat Lions",
			"RCB":"Royal Challengers Bangalore"
		};
        this.winners = {
            2008:"RR",
            2009:"DC",
            2010:"CSK",
            2011:"CSK",
            2012:"KKR",
            2013:"MI",
            2014:"KKR",
            2015:"MI",
            2016:"SRH"
        };
		this.tableHeaders = ["Team","Played","Won","Lost","NRR","Points"];
		this.cell = {
            "width": 120,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };
        this.goalScale = null;
        this.aggregateColorScale = null;
        this.gameScale = null;
        this.activeYear = 2008;
        this.codes = {"RR":"RJ","DD":"DL","SRH":"AP","DC":"AP","MI":"MH","RPS":"MH","PWI":"MH","CSK":"TN","KTK":"KL","KXIP":"PB","KKR":"WB","RCB":"KA","GL":"GJ"};
        this.gameView = gameView;
        this.teamSelector = teamSelector;
        this.gameTimeline = gameTimeline;
        this.clicked = false;



	}
	createTable(rankings){
		this.goalScale = d3.scaleLinear().range([0,this.cell.width-this.cell.buffer]).domain([0,16]).nice();
        this.aggregateColorscale = d3.scaleLinear().range(["#b1c8ed","#385f9e"]).domain([0,16]);
        this.gameScale = d3.scaleLinear().range([0,this.cell.width-this.cell.buffer]).domain([0,16]).nice();
 		// Set sorting callback for clicking on headers
        let table = this;
        let asc = true;
        let headers = d3.select("thead").selectAll("th")
                        .on("click",function(d,i){  
                        console.log("clicked: ",table.tableHeaders[i]);                           
                            if(asc){
                                //console.log("asc: ",asc);
                                	rankings.sort(function(a,b){
                                    let val1 = a[table.tableHeaders[i]];
                                    let val2 = b[table.tableHeaders[i]];
                                    if(table.tableHeaders[i] !== "Team"){
                                    	val1 = +val1;
                                    	val2 = +val2;
                                    }
                                    //console.log("typeof(val1) and typeof(val2): ",typeof(val1),typeof(val2));
                                    if(val1 < val2) return -1;
                                    else return 1;
                                });
                                asc = false;
                            }
                            else{
                                //console.log("asc: ",asc);
                                	rankings.sort(function(a,b){  
                                    let val1 = a[table.tableHeaders[i]];
                                    let val2 = b[table.tableHeaders[i]];
                                    if(table.tableHeaders[i] !== "Team"){
                                    	val1 = +val1;
                                    	val2 = +val2;
                                    }
                                    if(val1 < val2) return 1;
                                    else return -1;
                                });
                                asc = true;
                            }
                            //table.collapseList();
                            table.updateTable(table.activeYear,rankings);
                        });




	}
	updateTable(year,rankings){
		this.activeYear = year;
		//console.log("In updatetable, rankings: ",rankings);
		var yearData = rankings.filter(d => d.Year === year);
		var tableData = [];
		for(var data of yearData){
			var obj = {};
			this.tableHeaders.map(th => {
				obj[th] = data[th];
			});
			tableData = tableData.concat(obj);
		}
		d3.select("tbody").selectAll("tr").remove();
		var tr = d3.select("tbody").selectAll("tr")
				   .data(tableData);
		tr.exit().remove();
        let trEnter = tr.enter().append("tr");
        tr = trEnter.merge(tr);
        let that = this;
        tr.attr("id", d => d.Team)
          .on("click", d => {
          	//console.log("clicked ",d.Team," on the table!");
          	var tableRows = document.getElementsByTagName("tr");
          	for(var row of tableRows){
                var cls = row.getAttribute("class");
                if(cls !== null){
                    if(row.getAttribute("class").indexOf("winner") === -1)
                        row.setAttribute("class","");
                    else
                        row.setAttribute("class","winner");
                }
                else
                    row.setAttribute("class","");

            }
          	d3.selectAll("tr").filter(tr => tr===d).classed("clicked",true);
            that.updateHighlight(d3.selectAll("tr").filter(tr => tr===d).attr("id"));
            that.selectTeam(that.activeYear,that.names[d.Team]);
            that.teamSelector.selectedTeam(that.activeYear,that.names[d.Team]);


          })
          .attr("class",d =>{
            if(d.Team === this.winners[this.activeYear])
                return "winner";
            else
                return "player";
          });
        var td = tr.selectAll("td")
        	       .data(d => {
        	       	return this.tableHeaders.map(th => {
        	       		var value,vis;
        	       		if(th === "Team")
        	       			value = this.names[d[th]];
        	       		else
        	       			value = d[th];
        	       		if(th === "Won" || th === "Lost")
        	       			vis = "bar";
        	       		else
        	       			vis = "text";
        	       		var obj = {"vis":vis,"value":value};
        	       		return obj;
        	       	});
        	       })
        	       .enter()
        	       .append('td');
        		   //.text(d => d["value"]);

        var cols = d3.selectAll("td");

        var barCols = cols.filter(td => td.vis === "bar");
        var svg = barCols.append('svg')
                         .attr('width',this.cell.width)
                         .attr('height',this.cell.height);
        svg.append('rect')
           .attr('x',0)
           .attr('y',0)
           .transition()
           .duration(1000)
           .attr('width', d => this.gameScale(d.value))
           .attr('height', this.bar.height)
           .attr("fill", d => this.aggregateColorscale(d.value));
        svg.append("text")
           .attr("x",d => this.gameScale(d.value))
           .attr("y", this.cell.height/2+5)
           .text(d => d.value);
        var textcols = cols.filter(td => td.vis === "text");
        textcols.text(d => d.value)
                .attr("style",d => {
                    if(!Number.isInteger(+d.value) && !isNaN(+d.value)){
                        if(+d.value > 0)
                            return "color:green";
                        else
                            return "color:red";
                    }
                });

	}
    updateHighlight(teamId){
        //console.log("clicked ",teamId, " on table.");
        var stateId = this.codes[teamId];
        var states = document.getElementsByClassName("playing");
        for(let s of states){
            //console.log("s: ",s);
            s.setAttribute("class","playing");
        }
        var state = document.getElementById(stateId);
        state.setAttribute("class","playing map-selected");

        
    }
    selectTeam(activeYear,team){
        if(this.clicked){
            this.gameTimeline.reset();
            this.teamSelector.reset(this.activeYear);
            this.gameView.reset();
        }
        this.clicked = true;
        this.teamSelector.selectedTeam(activeYear,team);
        console.log(team)
        this.gameTimeline.teamUpdate(this.activeYear,team);
        this.gameView.reset();
    }
}
