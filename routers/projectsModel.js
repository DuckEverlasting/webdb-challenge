const db = require('../data/dbConfig.js')

module.exports = {
  add,
  find,
  findById,
  update,
  remove
}

function add(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
    .where('id', id)
    .first();
}

function update(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes)
    .then(project => {
      if(project > 0) {
        return findById(id);
      } else {
        return null;
      }
    })
}

function remove(id) {
  return findById(id)
    .then(() => {
      return db('projects')
        .where('id', id)
        .del();
    });
}