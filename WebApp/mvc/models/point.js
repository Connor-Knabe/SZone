var mongoose = require('mongoose');

exports.pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: false },
	date: { type: String, required: false, unique: false },
	dateAdded: { type: Date, required: false, unique: false },
	pointAmt:{ type: Number, required: false, unique: false },
	gps: { latitude: { type: String, required:false, unique: false }, longitude: { type: String, required:false, unique: false }},
	city: { type: String, required: false, unique: false },
    notes: { type: String, required: false, unique: false }
});

