const express = require('express');
const router = express.Router();

const actions = require('./actionsModel.js');
const projects = require('./projectsModel.js');
const contexts = require('./contextsModel.js');

router.post('/', validateBody, validateProjectId, (req, res) => {
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
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid action id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.put('/id=:id', validateBody, validateProjectId, (req, res) => {
  const id = req.params.id
  const changes = req.body
  actions.update(id, changes)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "invalid action id" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.delete('/id=:id', (req, res) => {
  const id = req.params.id
  actions.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "invalid project id" })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.post('/contexts', validateActionId, validateContextId, (req, res) => {
  const actionInContext = req.body
  actions.addActionContext(actionInContext)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/contexts', (req, res) => {
  actions.findActionContext()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

router.get('/contexts/actionid=:id&contextid=:contextid', (req, res) => {
  const actionId = req.params.id
  const contextId = req.params.contextid
  actions.findActionContextByIds(actionId, contextId)
    .then(data => data ? res.status(200).json(data) : res.status(400).json({ message: "no such item" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.delete('/contexts/actionid=:id&contextid=:contextid', (req, res) => {
  const actionId = req.params.id
  const contextId = req.params.contextid
  actions.removeActionContext(actionId, contextId)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "no such item" })
    })
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
});

function validateProjectId(req, res, next) {
  const projectId = req.body.project_id;
  projects.findById(projectId)
    .then(data => data ? req.post = data : res.status(400).json({ message: "invalid project id" }))
    .catch()
  next();
};

function validateActionId(req, res, next) {
  const actionId = req.body.action_id;
  actions.findById(actionId)
    .then(data => data ? req.post = data : res.status(400).json({ message: "invalid action id" }))
    .catch()
  next();
};

function validateContextId(req, res, next) {
  const contextId = req.body.context_id;
  contexts.findById(contextId)
    .then(data => data ? req.post = data : res.status(400).json({ message: "invalid context id" }))
    .catch()
  next();
};

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
  const badParams = checkParams(body, ["description", "notes", "completed", "project_id"])
  if (badParams.length) {
    res.status(400).json({ message: `invalid parameters: ${badParams}` })
  } else if (!body.description || typeof body.description !== "string" || body.description.length > 255) {
    res.status(400).json({ message: "invalid description" })
  } else if (body.notes && (typeof body.notes !== "string" || body.notes.length > 1023)) {
    res.status(400).json({ message: "invalid notes" })
  } else if (body.completed && typeof body.completed !== "boolean") {
    res.status(400).json({ message: '"completed" must be true or false' })
  } else {
    next();
  }
};

module.exports = router;