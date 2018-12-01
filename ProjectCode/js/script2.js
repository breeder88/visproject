d3.csv('Datasets/hometownSupport.csv').then( homeSupport=> {
	d3.csv('Datasets/rankings.csv').then(rankings =>{
		var  birdsView = new BirdsView(homeSupport,rankings);
		birdsView.createComparisionChart();
	});
});