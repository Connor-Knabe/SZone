var request = require('request');
var util = require('util')

var helper = require('./helper.js')

module.exports = function (app, passport, Points, User, db) {
	app.get('/', function(req, res) {
		if (req.user){
			
			//var totall = getTotalPts(req.user.email);
			//res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:totall,ipinfo:"0"});

			getTotalPts(req.user.email,function(points){
				res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:points,ipinfo:"0"});
			});
		} else {
			res.render('index.ejs', {action:"index", user:null, message: req.session.messages });
		}
	});

	app.post('/lastTen', function(req, res) {
		console.log("In last10 route");
		if (req.user){
			findLastTen(req.user.email,function(results){
				//Send the JSON to the page
				console.log("Results"+results);
				
			});	
		}


	});

	app.post('/addPoint', function(req, res) {
		console.log("LATITUDE"+req.body.latitude);
	
			
		var pts = new Points({
			email: req.user.email,
			date:helper.getDateTime(),
			pointAmt:req.body.pointValue,
			gps:{latitude:req.body.latitude,longitude:req.body.longitude},
			notes: req.body.notes
		});
		
		
		pts.save(function(err) {
			if(err) {
				console.log("error during add point" + err);
				res.redirect('/#profile');
			} 
			console.log("Saving point");
			res.redirect('/#profile');

		});
	});

	app.post('/ip', function(req,res) {
		console.log("POST IP");

		var ip = req.connection.remoteAddress;
		request('http://www.ipinfo.io/'+ip, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.

				var jsonIp = JSON.parse(body);
				console.log("location"+ jsonIp.loc);

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
			date:helper.getDateTime(),
			pointAmt:'0',
			gps:{latitude:"",longitude:""},
			notes: 'signup'
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
					res.redirect('/');

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
	
	
	function findLastTen(usrEmail,callback){
		var results = Points.aggregate(
	   	{ $sort: {_id:-1}},
	    { $match : {email : "con@con.com"} },
	    { $limit : 5  } 
	    , function(err,res){
		    if (err) console.log("Error"+err);
			callback(res);	    
	    });
	
	}
}
