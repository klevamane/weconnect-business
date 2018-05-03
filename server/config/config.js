module.exports = {

  development: {
    username: 'user',
    password: 'user',
    // database: 'sampledbtwo',
    database: 'testdb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'user',
    password: 'user',
    database: 'testdb',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

