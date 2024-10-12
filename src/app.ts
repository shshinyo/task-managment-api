import express from 'express';
import bodyParser from 'body-parser';
import {userRouter, taskRouter} from './routes';
import {setupSwagger} from './utils';
import { errorMiddleware , rateLimiter} from './middlewares';

const app = express();
app.use(rateLimiter);

// Middleware to parse JSON
app.use(express.json());

// Setup Swagger
setupSwagger(app);

app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.use(errorMiddleware);


export default app;
