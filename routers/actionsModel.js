const db = require('../data/dbConfig.js')

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  addActionContext,
  findActionContext,
  findActionContextByIds,
  removeActionContext
}

function add(action) {
  return db('actions')
    .insert(action)
    .then(ids => {
      [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('actions');
}

async function findById(id) {
  const action = await db('actions')
    .where('id', id)
    .first();
  if (!action) {
    return null
  } else {
    action.contexts = await getContextsbyAction(id);
    return action;
  }
}

function getContextsbyAction(id) {
  return db('actions_in_context as aic')
    .join('actions as a', 'a.id', 'aic.action_id')
    .join('contexts as c', 'c.id', 'aic.context_id')
    .select('c.id', 'c.name')
    .where('a.id', id)
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then(action => {
      if(action > 0) {
        return findById(id);
      } else {
        return null;
      }
    })
}

function remove(id) {
  return db('actions')
    .where('id', id)
    .del();
}

function addActionContext(actionInContext) {
  return db('actions_in_context')
    .insert(actionInContext)
    .then(ids => {
      [id] = ids;
      return findById(id);
    });
}

function findActionContext() {
  return db('actions_in_context');
}

async function findActionContextByIds(actionId, contextId) {
  return db('actions_in_context')
    .where('action_id', actionId)
    .where('context_id', contextId)
    .first();
}

function removeActionContext(actionId, contextId) {
  return db('actions_in_context')
    .where('action_id', actionId)
    .where('context_id', contextId)
    .del();
}