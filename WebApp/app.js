var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var mongodb = require('mongodb')
var mongoose = require('mongoose');

app.get('/', function(req, res) {
	res.render('index.ejs', {action:"index"});
});
app.get('/signup', function(req, res) {
	res.render('index.ejs', {action:"signup"});
});
app.get('login', function(req, res) {
	res.render('index.ejs', {action:login});
};








/*var configDB = require('./config/database.js');
mongoose.connect(configDB.url); 

require('./config/passport')(passport); 

app.configure(function() {

    app.use(express.json());
    app.use(express.urlencoded());
 	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/public'));
	
	app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');	
	
	app.use(express.session({ secret: 'smilezone' })); //add this
	app.use(passport.initialize());
	app.use(passport.session()); 

});*/

//require('./config/routes.js')(app,passport,server);

server.listen(port);
