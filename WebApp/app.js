var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
var sessionSecret = require('./sessionSecret.js');

var mongodb = require('mongodb')
var mongoose = require('mongoose');


//Models
var model = require('./mvc/models.js');

//Controllers
require('./mvc/controllers.js');



mongoose.connect('localhost', 'SmileZone');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
})



var Points = mongoose.model('Points', model.pointsSchema);



app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());
 	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/views');
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

app.get('/', function(req, res) {
	console.log("user"+req.user);
	if (req.user){
		var pointsArr;
		var totalPoints = 0;
		var query = Points.where({email:req.user.email});
		//If user is logged in check to see how many points they have
		query.findOne(function(err, points) {
				if(err) console.log("ERR for total points " + err);
				if(err) return handleErr(err);
				if(points){
					pointsArr = points.points;
					for (var i = 0; i < pointsArr.length; i++) {
						totalPoints += parseInt(pointsArr[i].pointAmt);
					}
					res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:totalPoints});
				}
		});
	} else {
		res.render('index.ejs', {action:"index", user:null, message: req.session.messages });
	}
});
app.get('/map', function(req, res) {
	res.render('map.ejs', {action:"index", user:null, message: req.session.messages });
});

app.post('/addPoint', function(req, res) {
	console.log("Longitude = "+req.body.long);
	console.log("latitude = "+req.body.lat);
	console.log("point val = "+req.body.pointValue);
	console.log("total val = "+req.body.total);

	var point = {
		date: 'Today1',
		loc:req.body.longitude+','+req.body.latitude,
		pointAmt: req.body.pointValue
	};

	Points.findOneAndUpdate(
		{email:req.user.email},
		{$push: {points:point}},
	    {safe: true, upsert: true},
    	function(err, model) {
			res.redirect('/#profile');
		}
	)
});

app.get('/signup', function(req, res) {
	if (req.user){
		var pointsArr;
		var totalPoints = 0;
		var query = Points.where({email:req.user.email});
		//If user is logged in check to see how many points they have
		query.findOne(function(err, points) {
				if(err) console.log("ERR for total points " + err);
				if(err) return handleErr(err);
				if(points){
					pointsArr = points.points;
					for (var i = 0; i < pointsArr.length; i++) {
						totalPoints += parseInt(pointsArr[i].pointAmt);
					}
					res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:totalPoints});
				}
		});

	} else {
		res.render('index.ejs', {action:"signup", error:"none"});
	}
});
app.get('/login',ensureAuthenticated, function(req, res){
	res.render('index.ejs', { action:"loggedin"});
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err) }
			if (!user) {
				req.session.messages =  [info.message];
				return res.redirect('/#login')
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
					return res.redirect('/#profile');
				});
			})(req, res, next);

});

function session(req, res) {
	res.redirect('/');
};

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.post('/signup', function(req, res) {
	//Seed a user

	if(req.body.password1 != req.body.password2){
		res.render('index.ejs', {action:"signup", error:"password"});
	}
	var usr = new User({
		firstName:req.body.firstname,
		lastName:req.body.lastname,
		email: req.body.email,
		password: req.body.password1 });

	var pts = new Points({
		email: req.body.email,
		points: [{date:Date.now, pointAmt:'0', loc:""}, {date:'L', pointAmt:'1', loc:"asf"}]
	});

	usr.save(function(err) {
		if(err) {
			console.log("error from signup" + err);
			if (err.message=='Validation failed'){
				res.render('index.ejs', {action:"signup", error:"blank"});
			} else {
				res.render('index.ejs', {action:"signup", error:"duplicate"});
			}
			console.log(err);
		} else {
			pts.save(function(err) {
				console.log("points error: " +err);
				var pointsArr;
				var totalPoints = 0;
				var query = Points.where({email:req.body.email});
				//If user is logged in check to see how many points they have
				query.findOne(function(err, points) {
						if(err) console.log("ERR for total points " + err);
						if(err) return handleErr(err);
						if(points){
							pointsArr = points.points;
							for (var i = 0; i < pointsArr.length; i++) {
								totalPoints += parseInt(pointsArr[i].pointAmt);
							}
							res.render('loggedin.ejs', {user:req.body.firstname,totalPoints:totalPoints});

						}
				});
			});
		}
	});

});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
server.listen(port);
