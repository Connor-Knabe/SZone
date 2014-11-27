var mongoose = require('mongoose');

exports.pointsSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
    points: [mongoose.Schema.Types.Mixed]
});
