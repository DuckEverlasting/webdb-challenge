const express = require('express');
const router = express.Router();

const projects = require('./projectsModel.js');

router.post('/', validateBody, (req, res) => {
  const project = req.body
  projects.add(project)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/', (req, res) => {
  projects.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/id=:id', (req, res) => {
  const id = req.params.id
  projects.findById(id)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid project id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.put('/id=:id', validateBody, (req, res) => {
  const id = req.params.id
  const changes = req.body
  projects.update(id, changes)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid project id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.delete('/id=:id', (req, res) => {
  const id = req.params.id
  projects.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "invalid project id" })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

function checkParams (obj = {}, acceptedParams = []) {
  const params = Object.keys(obj);
  return (
    params.filter(param => {
      if (!acceptedParams.includes(param)) {
        return true;
      }
    })
  )
}

function validateBody(req, res, next) {
  const body = req.body;
  const badParams = checkParams(body, ["name", "description", "completed"])
  if (badParams.length) {
    res.status(400).json({ message: `invalid parameters: ${badParams}` })
  } else if (!body.name || typeof body.name !== "string" || body.name.length > 255) {
    res.status(400).json({ message: "invalid name" })
  } else if (body.description && (typeof body.description !== "string" || body.description.length > 255)) {
    res.status(400).json({ message: "invalid description" })
  } else if (body.completed && typeof body.completed !== "boolean") {
    res.status(400).json({ message: '"completed" must be true or false' })
  } else {
    next();
  }
};

module.exports = router;