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
	var motherOfAllArrays = []
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
		
		motherOfAllArrays.push(response[i].finalResult);

	} 
	
	renderChart();
	renderChart2();
	return motherOfAllArrays;
}).then(function(response) {
	var statObject = [];

	var tempObj = []
		for (var k = 0; k < 13; k++) {
			tempObj[k] = {
				'1' : 0,
				'X' : 0,
				'2'	: 0,
			}
	};



	for (var i = 0; i < response.length; i++) {
		for (var j = 0; j < response[i].length; j++) {
			var char = response[i].charAt(j);
			if (char === '1') {
				tempObj[j]['1'] += 1;
			} else if (char === 'X') {
				tempObj[j]['X'] += 1;
			} else if (char === '2') {
				tempObj[j]['2'] += 1;
			}
		}
	}
	return tempObj

}).then(function(response) {
	console.log(response.length, response);
	var obj = []
	for (var i = 0; i < response.length; i++) {
		var one = response[i]['1'];
		var cross = response[i]['X'];
		var two = response[i]['2'];
		var total = one+two+cross;
		obj[i] = {
			'1': Math.round((one / total ) * 100 * 10)/10 ,
			'X': Math.round((cross / total ) * 100 * 10)/10 ,
			'2': Math.round((two / total ) * 100 * 10)/10
		}
	}	
	console.log(obj);	
});

function renderChart() {
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: xLabels, 
	    datasets: [
	      { 
	        data: thirteen,
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

function createObject(callback) {
		var tempObj = {}
		for (var k = 0; k < 13; k++) {
		tempObj[k] = {
			'1' : 0,
			'X' : 0,
			'2'	: 0,
		}
	};
	callback(tempObj);
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

