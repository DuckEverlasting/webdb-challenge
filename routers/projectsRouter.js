const express = require('express');
const router = express.Router();

const projects = require('./projectsModel.js');

router.post('/', (req, res) => {
  const project = req.body
  projects.add(project)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))});

router.get('/', (req, res) => {
  projects.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  projects.findById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  projects.update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  projects.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "no such item." })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))});


module.exports = router;