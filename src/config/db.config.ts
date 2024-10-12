// src/db.ts
import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async () => {
    try {    
        await mongoose.connect(config.dbUri, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }

    // Handle MongoDB connection events
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
        connectDB(); 
    });
};

export default connectDB;
