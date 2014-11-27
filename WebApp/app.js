var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var path = require('path');
var http = require('http');
var server = http.createServer(app);
//var bodyParser = require('body-parser');
var sessionSecret = require('./sessionSecret.js');

var mongodb = require('mongodb')
var mongoose = require('mongoose');
var passport = require('passport');

//Models
var userModel = require('./mvc/models/user.js');
var pointModel = require('./mvc/models/point.js');


//Include passport
require('./mvc/controllers/passport.js')(app, passport);

mongoose.connect('localhost', 'SmileZone');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
})

var Points = mongoose.model('Points', pointModel.pointsSchema);

app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());
 	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/mvc/views');
    app.set('view engine', 'ejs');
	app.use(express.session({ secret: sessionSecret.secret }));
	// Remember Me middleware
	app.use( function (req, res, next) {
		if ( req.method == 'POST' && req.url == '/login' ) {
			    req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
		}
		next();
	});
	app.use(passport.initialize());
	app.use(passport.session());

});

require('./mvc/controllers/routes.js')(app, passport, Points);

server.listen(port);
