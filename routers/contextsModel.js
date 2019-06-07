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

function findById(id) {
  return db('contexts')
    .where('id', id)
    .first();
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
  return findById(id)
    .then(() => {
      return db('contexts')
        .where('id', id)
        .del();
    });
}