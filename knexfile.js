module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dbChallenge.db3'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './data/seeds',
    },
    migrations: {
      directory: './data/migrations',
    },
  },
};