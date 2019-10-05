var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({

    facilityId: Number,
	quantity: Number,
	bookingDate: Date,
	startTime: Date,
	duration: Date,
	status: String,
    complete: Boolean
});

module.exports = mongoose.model('bookings', bookingSchema);