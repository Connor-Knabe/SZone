var User = require('../models/user');

module.exports = function(app,passport,server) {
	app.get('/', function(req, res) {
		res.render('index.ejs');
		console.log("index");
	});
	app.get('/signup', function(req, res) {
		res.render('index.ejs',{action:signup});
		console.log("signup");
	});
	app.get('login', function(req, res) {
		res.render('index.ejs',{action:login});
	});

}
