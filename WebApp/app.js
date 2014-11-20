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

mongoose.connect('localhost', 'SmileZone');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
})

//User Schema

var userSchema = mongoose.Schema({
	firstName: { type: String, required: true, unique: false },
	lastName: { type: String, required: true, unique: false },
	email: { type: String, required: true, unique: true },
	dateRegistered: { type: Date, default: Date.now },
	password: { type: String, required: true, unique:false }
});

var pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
    points: [mongoose.Schema.Types.Mixed]
	//points: [{date: {type: String, required: true}, pointAmt: {type: Number, required: true}, loc:{type: String, required: true}}]
});

var Points = mongoose.model('Points', pointsSchema);


// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};
var User = mongoose.model('User', userSchema);

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	User.findOne( { email: email } , function (err, user) {
		done(err, user);
	});
});


// Bcrypt middleware
userSchema.pre('save', function(next) {
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
	function(email, password, done) {
	  	User.findOne({ email: email }, function(err, user) {
	    	if (err) { return done(err); }
	    	if (!user) { return done(null, false, { message: 'Unknown user ' + email }); }
	    	user.comparePassword(password, function(err, isMatch) {
		  		if (err) return done(err);
		      	if(isMatch) {
		        	return done(null, user);
		      	} else {
		        	return done(null, false, { message: 'Invalid password' });
		      	}
	    	});
	  	});
}));


app.configure(function() {

    app.use(express.json());
    app.use(express.urlencoded());
 	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/public'));

	app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

	app.use(express.session({ secret: 'asmilezone' })); //add this
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
	if (req.user){
		console.log(req.user);


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

app.post('/addPoint', function(req, res) {
	console.log("Longitude = "+req.body.longitude);
	console.log("latitude = "+req.body.latitude);

	var pointVal = 10;
	if (req.body.pointValue=="1"){
		pointVal = '1';
		console.log("one point");
	} else if (req.body.pointValue=="2") {
		pointVal = '2';
		console.log("two point");

	} else if (req.body.pointValue=="3") {
		pointVal = '3';
		console.log("threes point");
	}

	var point = {
		date: 'Today1',
		loc:req.body.longitude+','+req.body.latitude,
		pointAmt: pointVal
	};

	Points.findOneAndUpdate(
		{email:req.user.email},
		{$push: {points:point}},
		//{email:'conn@con.com'},
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

function session (req, res) {
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


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

server.listen(port);
