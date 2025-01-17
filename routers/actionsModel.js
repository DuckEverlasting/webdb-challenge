const db = require('../data/dbConfig.js')

module.exports = {
  add,
  find,
  findById,
  update,
  remove
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
  action.contexts = await getContextsbyAction(id);
  return action;
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
  return findById(id)
    .then(() => {
      return db('actions')
        .where('id', id)
        .del();
    });
}