var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var url = require('url');
var request = require('request');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
});



app.post('/submit', function(req, res){
	var latitude = req.body.lat;

	var longitude = req.body.longitude;
	var name = req.body.name;
	var ip = req.connection.remoteAddress;

	console.log(req.body);
	console.log(ip);

	var options = {
	  protocol: "http",
	  host: 'ipinfo.io',
	  pathname: '/'+ip+'/json',
	};

	var ipinfoUrl = url.format(options);
	request(ipinfoUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var parsedData = JSON.parse(body);
			console.log(parsedData);
		}

	});



	res.render('index');
});


app.listen(80);
