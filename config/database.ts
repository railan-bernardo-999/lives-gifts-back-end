import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'lives',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lives_gifts',
  password: process.env.DB_PASSWORD || 'lives',
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL');
});

pool.on('error', (err: Error) => {
  console.error('❌ Erro na conexão com PostgreSQL:', err);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export { pool };