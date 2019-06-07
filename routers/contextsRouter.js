const express = require('express');
const router = express.Router();

const contexts = require('./contextsModel.js');

router.post('/', validateBody, (req, res) => {
  const context = req.body
  contexts.add(context)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))});

router.get('/', (req, res) => {
  contexts.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/id=:id', (req, res) => {
  const id = req.params.id
  contexts.findById(id)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid context id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.put('/id=:id', validateBody, (req, res) => {
  const id = req.params.id
  const changes = req.body
  contexts.update(id, changes)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid context id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.delete('/id=:id', (req, res) => {
  const id = req.params.id
  contexts.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "invalid context id" })
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
  const badParams = checkParams(body, ["name"])
  if (badParams.length) {
    res.status(400).json({ message: `invalid parameters: ${badParams}` })
  } else if (!body.name || typeof body.name !== "string" || body.name.length > 255) {
    res.status(400).json({ message: "invalid name" })
  } else {
    next();
  }
};

module.exports = router;