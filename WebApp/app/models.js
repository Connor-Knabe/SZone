var mongoose = require('mongoose');

exports.userSchema = mongoose.Schema({
	firstName: { type: String, required: true, unique: false },
	lastName: { type: String, required: true, unique: false },
	email: { type: String, required: true, unique: true },
	dateRegistered: { type: Date, default: Date.now },
	password: { type: String, required: true, unique:false }
});

exports.pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
    points: [mongoose.Schema.Types.Mixed]
});
