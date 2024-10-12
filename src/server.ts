import mongoose from 'mongoose';
import app from './app';
import { config } from './config/config';
import connectDB from './config/db.config';

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
};

startServer();
