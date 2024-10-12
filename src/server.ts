import mongoose from 'mongoose';
import app from './app';
import { config } from './config/config';

const startServer = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log('Database connected');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
};

startServer();
