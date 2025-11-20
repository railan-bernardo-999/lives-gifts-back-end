import express from 'express';
import routes from './routes/index'

export const app = express();

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const db = require('./config/database');
    await db.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      database: 'Connected' 
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});


app.use(routes);

