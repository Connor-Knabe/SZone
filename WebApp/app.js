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




mongoose.connect('localhost', 'test2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
})

//User Schema

var userSchema = mongoose.Schema({
	firstName: { type: String, required: true, unique: true },
	lastName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
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



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne( { email: email } , function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(email, password, done) {
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
			if ( req.body.rememberme ) {
			    req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
		    } else {
				req.session.cookie.expires = false;
			}
		}
		next();
	});
	app.use(passport.initialize());
	app.use(passport.session());

});

app.get('/', function(req, res) {
	res.render('index.ejs', {action:"index"});
});
app.get('/signup', function(req, res) {
	res.render('index.ejs', {action:"signup", error:"none"});
});
app.get('/login',ensureAuthenticated, function(req, res){
	res.render('index.ejs', { action:"login"});
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
			console.log("NOT USER");
			return res.redirect('/login')
		}
		req.logIn(user, function(err) {
			console.log("B4 logged in error");
			if (err) { return next(err); }
			console.log("LOGGEDIN");
			return res.redirect('/');
		});
	})(req, res, next);
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.post('/signup', function(req, res) {
	//Seed a user
	var User = mongoose.model('User', userSchema);

	if(req.body.password1 != req.body.password2){
		res.render('index.ejs', {action:"signup", error:"password"});
	}

	console.log("Firstname:"+ req.body.firstname);
	console.log("lastname:"+ req.body.lastname);
	console.log("email:"+ req.body.email);
	console.log("password:"+ req.body.password1);
	var usr = new User({ firstName:req.body.firstname, lastName:req.body.lastname, email: req.body.email, password: req.body.password1 });

	usr.save(function(err) {
		if(err) {
			res.render('index.ejs', {action:"signup", error:"duplicate"});
			console.log(err);
		} else {
			res.render('index.ejs', {action:"loggedin", error:"none"})
			console.log('user: ' + usr.email + "saved.");
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

//require('./config/routes.js')(app,passport,server);

server.listen(port);
