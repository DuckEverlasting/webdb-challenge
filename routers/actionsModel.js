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

function findById(id) {
  return db('actions')
    .where('id', id)
    .first();
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