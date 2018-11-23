class Table{
	//season-wise rankings view
	constructor(){
		//this.rankings = rankings;
		this.names = {
			"KKR":"Kolkatta Knight Riders",
			"SRH":"Sun Risers Hyderabad",
			"DC":"Deccan Chargers",
			"CSK":"Chennai Super Kings",
			"DD":"Delhi Daredevils",
			"KXIP":"Kings XI Punjab",
			"MI":"Mumbai Indians",
			"RR":"Rajasthan Royals",
			"RPS":"Rising Pune Supergiants",
			"KTK":"Kochi Tuskers Kerala",
			"PWI":"Pune Warriors India",
			"GL":"Gujarat Lions",
			"RCB":"Royal Challengers Bangalore"
		};
		this.tableHeaders = ["Team","Played","Won","Lost","NRR","Points"];


	}
	createTable(){

	}
	updateTable(year,rankings){
		console.log("inside updateTable(), year: ",year);
		console.log("rankings data: ",rankings);
		var yearData = rankings.filter(d => d.Year === year);
		console.log("yearData: ",yearData);
		/*for(var data of tableData){
			delete data.Year;
			delete data.Winner;
			delete data.Tied;
			delete data.NoResult;
			data.Team = this.names[data.Team];
		}*/
		var tableData = [];
		for(var data of yearData){
			var obj = {};
			this.tableHeaders.map(th => {
				obj[th] = data[th];
			});
			tableData = tableData.concat(obj);
		}
		console.log("tableData modified: ",tableData);
		d3.select("tbody").selectAll("tr").remove();
		var tr = d3.select("tbody").selectAll("tr")
				   .data(tableData);
	    console.log("tablebody row selection, tr: ",tr);
	    console.log("tableHeaders: ",this.tableHeaders);
		tr.exit().remove();
        let trEnter = tr.enter().append("tr");
        tr = trEnter.merge(tr);
        var td = tr.selectAll("td")
        	       .data(d => {
        	       	return this.tableHeaders.map(th => {
        	       		var value;
        	       		if(th === "Team")
        	       			value = this.names[d[th]];
        	       		else
        	       			value = d[th];
        	       		console.log("value: ",value);
        	       		var obj = {"value":value};
        	       		return obj
        	       	});
        	       })
        	       .enter()
        	       .append('td')
        		   .text(d => d["value"]);

	}
}