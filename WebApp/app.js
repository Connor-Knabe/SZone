var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');


var configDB = require('./config/database.js');
mongoose.connect(configDB.url); 

require('./config/passport')(passport); 

app.configure(function() {

    app.use(express.json());
    app.use(express.urlencoded());
    
 	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/public'));
	//app.use("/css", express.static(__dirname + 'css'));


//	app.engine('html', require('ejs').renderFile); //renders .ejs as html	
	app.set('views', __dirname + '/views');
	//app.use("/css",express.static(__dirname + "/views/css"));
    app.set('view engine', 'ejs');	
	
	app.use(express.session({ secret: 'smilezone' })); //add this
	app.use(passport.initialize());
	app.use(passport.session()); 

});

require('./controller/routes.js')(app,passport,server);

server.listen(port);
