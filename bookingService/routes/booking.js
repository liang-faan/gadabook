var _ = require('lodash');
var Booking = require('../models/booking.js');

module.exports = function(app) {

    app.get('/booking/inventory', function (req, res) {
        Booking.find(function(err, bookings) {
            if (err) {
                res.json({info: 'error during find bookings', error: err});
				return;
            };
            res.json({info: 'bookings found successfully', data: bookings});
        });
    });
	
	app.get('/booking/order/:orderId', function (req, res, next) {
        Booking.findById(req.params.orderId, function(err, booking) {
            if (err) {
                res.json({info: 'error during find booking', error: err});
            };
            if (booking) {
                res.json({info: 'booking found successfully', data: booking});
            } else {
                res.json({info: 'booking not found'});
            }
        });
    });
	
	app.post('/booking/order', function (req, res) {
        var newBooking = new Booking(req.body);
        newBooking.save(function(err) {
            if (err) {
                res.json({info: 'error during booking create', error: err});
				return;
            };
            res.json({info: 'booking created successfully'});
        });
    });

    app.put('/booking/:id', function (req, res) {
        Booking.findById(req.params.id, function(err, booking) {
            if (err) {
                res.json({info: 'error during find booking', error: err});
            };
            if (booking) {
                _.merge(booking, req.body);
                booking.save(function(err) {
                    if (err) {
                        res.json({info: 'error during booking update', error: err});
                    };
                    res.json({info: 'booking updated successfully'});
                });
            } else {
                res.json({info: 'booking not found'});
            }

        });
    });

    app.delete('/booking/:id', function (req, res) {
        Booking.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove booking', error: err});
            };
            res.json({info: 'booking removed successfully'});
        });
    });


};
