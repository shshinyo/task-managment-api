import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

// Error Handling Middleware
const middleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error'; 

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const errorMiddleware = middleware;
