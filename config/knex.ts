import knex from 'knex';
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const db = knex(config);

// Testar conexão
db.raw('SELECT 1')
  .then(() => console.log('✅ PostgreSQL conectado via Knex'))
  .catch(err => console.error('❌ Erro na conexão:', err));

export default db;