module.exports = (app, d) => {
  app.get('/booking', (req, res) => res.send(d.listBooking))
  app.post('/booking', (req, res) => res.send(d.postBooking))
  app.get('/booking/:bookingId', (req, res) => res.send(d.getBooking))
  app.delete('/booking/:bookingId', (req, res) => res.send(d.deleteBooking))
}
