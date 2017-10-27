console.log('loaded');
var xLabels = [];
var ten = [];
var eleven = [];
var twelve = [];
var thirteen = [];
var turnover = [];
var banana = [];
var adf = [];
var drawNum = [];

fetch('/plshelp').then(function(response) {
	return response.json()
}).then(function(response) {
	for (var i = 0; i < response.length; i++) {
		ten.push(response[i][10]);
		eleven.push(response[i][11]);
		twelve.push(response[i][12]);
		thirteen.push(response[i][13]);
		xLabels.push(response[i].round);
		turnover.push(response[i].turnover / 1000000);

		drawNum.push(response[i].drawNum);

		adf.push(response[i]['13win']);

		banana.push(((response[i]['13win']*response[i][13])+(response[i]['12win']*response[i][12])+(response[i]['11win']*response[i][11])+(response[i]['10win']*response[i][10])) / 1000000);
	} 
	
	renderChart();
	renderChart2();
});

function renderChart() {
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: drawNum, 
	    datasets: [
	      { 
	        data: adf,
	        label: '13 rätt',
	        fill: false,
	        borderColor: "#3e42fa",
	        backgroundColor: "green"
	    }
	     //  {
	     //  	data: turnover,
	     //  	label: 'Turnover',
	     //  	type: 'line' 
	  	  // }
	    ]
	  }
	});
}

function renderChart2() {
	var ctx = document.getElementById('myChart2');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: xLabels, 
	    datasets: [
	      { 
	        data: banana,
	        label: 'Total Utdelning',
	        fill: true,
	        backgroundColor: "rgb(253, 121, 133)",
	      },
	      {
	    	data: turnover,
	      	backgroundColor: 'rgb(97, 185, 220)',
	      	label: 'Total Omsättning (MSEK)'
	      }
	    ]
	  },
	  options: {
	        scales: {
	            xAxes: [{
	                stacked: true
	            }],
	            yAxes: [{
	                stacked: true
	            }]
	        }
    	}
	});
}

function renderChart2() {
	var ctx = document.getElementById('myChart2');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: xLabels, 
	    datasets: [
	      { 
	        data: banana,
	        label: 'Total Utdelning',
	        fill: true,
	        backgroundColor: "rgb(253, 121, 133)",
	      },
	      {
	    	data: turnover,
	      	backgroundColor: 'rgb(97, 185, 220)',
	      	label: 'Total Omsättning (MSEK)'
	      }
	    ]
	  },
	  options: {
	        scales: {
	            xAxes: [{
	                stacked: true
	            }],
	            yAxes: [{
	                stacked: true
	            }]
	        }
    	}
	});
}

