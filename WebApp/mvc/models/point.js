var mongoose = require('mongoose');

exports.pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: false },
    points: [mongoose.Schema.Types.Mixed],
    notes: { type: String, required: false, unique: false }
});
