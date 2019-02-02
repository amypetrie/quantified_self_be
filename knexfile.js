module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://ujmfurijbrelns:9bf8bc8483cc90d2326976c1391e143af7b0ccc263f2ee880613d8998fa56f17@ec2-23-21-171-25.compute-1.amazonaws.com:5432/df4gn4tr2jthtv',
    migrations: {
      directory: './db/migrations'
    },
    ssl: true,
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  }
};
