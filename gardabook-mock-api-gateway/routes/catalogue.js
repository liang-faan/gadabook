module.exports = (app, d) => {
  app.get('/catalogue', (req, res) => res.send(d.listCatalogue))
  app.post('/catalogue', (req, res) => res.send(d.postCatalogue))
  app.get('/catalogue/:catalogueId', (req, res) => res.send(d.getCatalogue))
  app.put('/catalogue', (req, res) => res.send(d.putCatalogue))
  app.delete('/catalogue/:catalogueId', (req, res) =>
    res.send(d.deleteCatalogue)
  )
}
