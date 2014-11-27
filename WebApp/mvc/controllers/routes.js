var request = require('request');

module.exports = function (app, passport, Points) {
	app.get('/', function(req, res) {
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
						res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:totalPoints,ipinfo:"0"});
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

	app.get('/ip', function(req,res) {
		var ip = req.connection.remoteAddress;
		request('http://www.ipinfo.io/'+ip, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.

				var jsonIp = JSON.parse(body);
				console.log("location"+ jsonIp.loc);

				var latLongArr = jsonIp.loc.split(',')
				console.log("lat split"+ latLongArr[0]);
				console.log("long split"+ latLongArr[1]);


			//	res.render('loggedin.ejs', {user:req.user.firstName,email:req.user.email, totalPoints:totalPoints, ipinfo:body});

			}
		});

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

}
