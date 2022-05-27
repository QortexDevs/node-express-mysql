const db = require('../models')
const Stub = db.stubs
const Op = db.Sequelize.Op

// Create and Save a new Stub
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  // Create a Stub
  const stub = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.type ? req.body.type : 0
  }
  // Save Stub in the database
  Stub.create(stub)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Stub.'
      })
    })
}

// Retrieve all Stubs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null
  Stub.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving stubs.'
      })
    })
}

// Find a single Stub with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Stub.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Stub with id=${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Stub with id=' + id
      })
    })
}

// Update a Stub by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  Stub.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Stub was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Stub with id=${id}. Maybe Stub was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Stub with id=' + id
      })
    })
}

// Delete a Stub with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Stub.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Stub was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Stub with id=${id}. Maybe Stub was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Stub with id=' + id
      })
    })
}

// Delete all Stubs from the database.
exports.deleteAll = (req, res) => {
  Stub.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Stubs were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all stubs.'
      })
    })
}
// Find all published Stubs
exports.findAllType4 = (req, res) => {
  Stub.findAll({ where: { type: 4 } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving stubs.'
      })
    })
}
