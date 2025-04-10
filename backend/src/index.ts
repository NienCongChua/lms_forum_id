import express from 'express';
import cors from 'cors';
import { testConnection } from './utils/database';
import authRoutes from './routes/authRoutes'; // Main auth routes
import { authRouter } from './routes/auth';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRouter);

async function main() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
