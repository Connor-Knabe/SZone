var User = require('../models/user');

module.exports = function(app,passport,server) {
	app.get('/', function(req, res) {
		res.render('template/index.ejs');
	});
}
