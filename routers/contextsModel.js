const db = require('../data/dbConfig.js')

module.exports = {
  add,
  find,
  findById,
  update,
  remove
}

function add(context) {
  return db('contexts')
    .insert(context)
    .then(ids => {
      [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('contexts');
}

async function findById(id) {
  const context = await db('contexts')
    .where('id', id)
    .first();
  if (!context) {
    return null
  } else {
    return context;
  }
}

function update(id, changes) {
  return db('contexts')
    .where('id', id)
    .update(changes)
    .then(context => {
      if(context > 0) {
        return findById(id);
      } else {
        return null;
      }
    })
}

function remove(id) {
  return db('contexts')
    .where('id', id)
    .del();
}