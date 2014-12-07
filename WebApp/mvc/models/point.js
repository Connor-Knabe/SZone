var mongoose = require('mongoose');

exports.pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: false },
	date: { type: String, required: false, unique: false },
	pointAmt:{ type: Number, required: false, unique: false },
    gps: [mongoose.Schema.Types.Mixed],
    notes: { type: String, required: false, unique: false }
});
