module.exports = (app, d) => {
  app.get('/enrollment', (req, res) => res.send(d.listEnrollment))
  app.post('/enrollment', (req, res) => res.send(d.postEnrollment))
  app.get('/enrollment/:enrollmentId', (req, res) => res.send(d.getEnrollment))
  app.delete('/enrollment/:enrollmentId', (req, res) =>
    res.send(d.deleteEnrollment)
  )
}
