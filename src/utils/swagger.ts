import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for the Task Management System',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
        },
    },
      schemas: {
          Task: {
              type: 'object',
              properties: {
                  id: {
                      type: 'string',
                      description: 'Unique identifier for the task',
                  },
                  title: {
                      type: 'string',
                      description: 'Title of the task',
                  },
                  description: {
                      type: 'string',
                      description: 'Description of the task',
                  },
                  userId: {
                      type: 'string',
                      description: 'ID of the user who created the task',
                  },
                  createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Creation timestamp of the task',
                  },
                  updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Last update timestamp of the task',
                  },
              },
              required: ['title', 'userId'], // Adjust based on required fields
          },
      },
  },
    servers: [
      {
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUtil = (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export const setupSwagger =  swaggerUtil;
