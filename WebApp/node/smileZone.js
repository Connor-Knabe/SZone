var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

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
	console.log(req.body);
	console.log(latitude);
	console.log(longitude);

	res.render('index');

});
app.listen(80);
