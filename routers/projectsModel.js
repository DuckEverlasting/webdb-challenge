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

async function findById(id) {
  const project = await db('projects')
    .where('id', id)
    .first();
  project.actions = await getActionsbyProject(id);
  return project;
}

function getActionsbyProject(id) {
  return db('projects as p')
    .join('actions as a', 'a.project_id', 'p.id')
    .select('a.id', 'a.description', 'a.notes', 'a.completed')
    .where('p.id', id)
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
  return db('projects')
    .where('id', id)
    .del();
}