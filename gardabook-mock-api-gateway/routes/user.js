module.exports = (app, d) => {
  app.post('/user', (req, res) => res.send(d.postUser))
  app.put('/user/:userId', (req, res) => res.send(d.putUser))
  app.get('/user/:userId', (req, res) => res.send(d.getUser))
  app.delete('/user/:userId', (req, res) => res.send(d.deleteUser))
}
