const express = require('express');
const router = express.Router();

const actions = require('./actionsModel.js');

router.post('/', (req, res) => {
  const action = req.body
  actions.add(action)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/', (req, res) => {
  actions.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/id=:id', (req, res) => {
  const id = req.params.id
  actions.findById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.put('/id=:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  actions.update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.delete('/id=:id', (req, res) => {
  const id = req.params.id
  actions.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "no such item." })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.post('/contexts', (req, res) => {
  const actionInContext = req.body
  actions.addActionContext(actionInContext)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/contexts', (req, res) => {
  actions.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/contexts/actionid=:id&contextid=:contextid', (req, res) => {
  const actionId = req.params.id
  const contextId = req.params.contextid
  actions.findActionContextByIds(actionId, contextId)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.delete('/contexts/actionid=:id&contextid=:contextid', (req, res) => {
  const actionId = req.params.id
  const contextId = req.params.contextid
  actions.removeActionContext(actionId, contextId)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "no such item." })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});


module.exports = router;