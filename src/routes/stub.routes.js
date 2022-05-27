module.exports = app => {
  const stubs = require('../controllers/stub.controller.js')

  var router = require('express').Router()
  // Create a new Stub
  router.post('/', stubs.create)
  // Retrieve all Stubs
  router.get('/', stubs.findAll)
  // Retrieve all published Stubs
  router.get('/type4', stubs.findAllType4)
  // Retrieve a single Stub with id
  router.get('/:id', stubs.findOne)
  // Update a Stub with id
  router.put('/:id', stubs.update)
  // Delete a Stub with id
  router.delete('/:id', stubs.delete)
  // Delete all Stubs
  router.delete('/', stubs.deleteAll)
  app.use('/api/stubs', router)
}
