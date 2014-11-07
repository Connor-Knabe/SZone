var express = require('express");
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.configure(function(){

		app.set('views',__dirname + '/views');
		app.set('view engine', 'ejs');
});

app.get('/', function(req,res){
	res.render('index');
});

