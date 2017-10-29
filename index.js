var express = require('express');
var promise = require('promise');
var https = require('https');
var request = require('request');
var app = express();
var http = require('http');
var path = require('path');

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


console.log('Listening on port 8081');

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/index.html')); 
});

app.get('/getapi', (req,res)=> {
	var drawNum = 4500;
	var url = ('https://api.www.svenskaspel.se/external/draw/stryktipset/draws/'+drawNum+'/result?accesskey=a7915973-7d03-4e93-8d44-e9d988451a52');
	var resArray = [];
	
	new Promise((resolve, reject)=> {
		
			request(url, (err, response, body)=> {
				body = JSON.parse(body);
				var tempObj = {
						13 : '',
							}
				
				var distribution = body.result.distribution;
				var events = body.result.events

				for (var i = 0; i < distribution.length; i++) {
					tempObj[13] = distribution[0].amount;
				}

				resArray.push(tempObj);
				resolve(resArray);
				drawNum++;
		});
		return resArray;
	}).then(function(data){
		res.send(JSON.stringify(data));
	}).catch((err)=>{
		console.log('Something went wrong', err);
	})
});

app.get('/plshelp', (req, res)=> {
	fetchData(function(array) {
		Promise.all(array).then(function(data) {
		var resarray = [];
			for (var i = 0; i < data.length; i++) {
				var correctDraw = "";
				for(var j = 0; j < data[i].result.events.length; j++) {
					correctDraw += data[i].result.events[j].outcome;
				}

				var tempObj = {
					round: data[i].result.closeTime.substring(0,10),
					13: parseInt(data[i].result.distribution[0].amount),
					12: parseInt(data[i].result.distribution[1].amount),
					11: parseInt(data[i].result.distribution[2].amount),
					10: parseInt(data[i].result.distribution[3].amount),
					'10win': data[i].result.distribution[0].winners,
					'11win': data[i].result.distribution[1].winners,
					'12win': data[i].result.distribution[0].winners,
					'13win': data[i].result.distribution[0].winners,
					drawNum: data[i].result.drawNumber,
					turnover: parseInt(data[i].result.turnover),
					finalResult: correctDraw
				}

				var tempArray = parseInt(data[i].result.distribution[0].amount);
				resarray.push(tempObj);
			} 

		return resarray;
		}).then(function(data) {
			res.send(JSON.stringify(data));
		}).catch(function(err) {
			console.log('An error occuraccio: ', err);
		}) 
	});
})

function fetchData(callback) {
	var ps = [];
	var drawNum = 4316; 
	for (var i = 0; i < 200; i++) {
		var prom = new Promise((resolve, reject)=>{
		var url = ('https://api.www.svenskaspel.se/external/draw/stryktipset/draws/'+drawNum+'/result?accesskey=a7915973-7d03-4e93-8d44-e9d988451a52');

		request(url, (err, response, body) => {
			body = JSON.parse(body);
			resolve(body);
			})
		drawNum++;
		});
		ps.push(prom);
	}
	callback(ps);
}