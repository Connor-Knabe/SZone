var request = require('request');
var util = require('util');
var sanitizer = require('sanitizer');
var moment = require('moment-timezone');

module.exports = function (app, passport, Points, User, db) {
	app.get('/', function(req, res) {
		if (req.user){
			getTotalPts(req.user.email,function(points){
				res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:points,ipinfo:"0"});
			});
		} else {
			res.render('index.ejs', {action:"index", user:null, message: req.session.messages });
		}
	});

	app.post('/lastTen', function(req, res) {
		if (req.user){
			findPointLog(req.user.email,10,function(results){
				//Send the JSON to the page
				console.log("Results"+results);

				res.type('json');
				res.send({queryResults:results});

			});
		}
	});

	app.post('/loadNotes', function(req, res) {
		if (req.user){
			findPointLog(req.user.email,10,function(results){
				//Send the JSON to the page
				res.type('json');
				res.send({queryResults:results});
			});
		}
	});

	app.post('/addPoint', function(req, res) {
		var cityName = "";
		request('https://maps.googleapis.com/maps/api/geocode/json?latlng='+req.body.latitude+','+req.body.longitude+'&key=AIzaSyBNR7EnIw78027wE8rF6Ki4Y-UnSLMfjss', function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var jsonInfo = JSON.parse(body);
				try {
					console.log("location"+ jsonInfo.results[2].formatted_address);
					cityName = jsonInfo.results[2].formatted_address;
				}
				catch(e){
					console.log('An error has occurred: '+e.message)
				}
				console.log("cityname is " +cityName);
				var pts = new Points({
					email: req.user.email,
					date:moment().tz("America/Chicago"),
					pointAmt:req.body.pointValue,
					gps:{latitude:req.body.latitude,longitude:req.body.longitude},
					city: cityName,
					notes: sanitizer.escape(req.body.notes)
				});


				pts.save(function(err) {
					if(err) {
						console.log("error during add point" + err);
						res.redirect('/#profile');
					}
					console.log("Saving point");
					res.redirect('/#profile');
		
				});


			} else {
				var pts = new Points({
					email: req.user.email,
					date:moment().tz("America/Chicago"),
					pointAmt:req.body.pointValue,
					gps:{latitude:req.body.latitude,longitude:req.body.longitude},
					city: "error",
					notes: sanitizer.escape(req.body.notes)
				});


				pts.save(function(err) {
					if(err) {
						console.log("error during add point" + err);
						res.redirect('/#profile');
					}
					res.redirect('/#profile');
		
				});

			}
		});



		
	});

	app.post('/ip', function(req,res) {
		var ip = req.connection.remoteAddress;
		request('http://www.ipinfo.io/'+ip, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.

				var jsonIp = JSON.parse(body);

				var latLongArr = jsonIp.loc.split(',')


				res.type('json');
				res.send({ip_info:latLongArr});


			}
		});

	});

	app.get('/signup', function(req, res) {
		if (req.user){
			getTotalPts(req.user.email,function(points){
				res.render('loggedin.ejs',{user:req.user.firstName,email:req.user.email, totalPoints:points,ipinfo:"0"});
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
			date:moment().tz("America/Chicago"),
			pointAmt:'0',
			gps:{latitude:"",longitude:""},
			notes: ''
		});

		usr.save(function(err) {
			var totalPoints = 0;
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
					res.render('index.ejs', {action:"success", error:"blank"});

				});
			}
		});

	});


	function ensureAuthenticated(req, res, next) {
	    if (req.isAuthenticated()) { return next(); }
	    res.redirect('/')
	}

	function getTotalPts(usrEmail,callback){

		var results = Points.aggregate(
	    { $match : {email : usrEmail} },
	    { $group : { _id : "$email", totalPoints : { $sum : { $add: ["$pointAmt"] } } }
	    }, function(err,res){
		    if (err) console.log("Error"+err);
			callback(res[0].totalPoints);
	    });

	}


	function findPointLog(usrEmail,resultNum,callback){
		var results = Points.aggregate(
	   	{ $sort: {_id:-1}},
	    { $match : {email : usrEmail} },
	    { $limit : resultNum  }
	    , function(err,res){
		    if (err) console.log("Error"+err);
			callback(res);
	    });

	}
}
