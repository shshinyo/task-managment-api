import Joi from 'joi';

// Task creation validation schema
export const createTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be less than 100 characters long',
  }),
  description: Joi.string().optional().max(500).messages({
    'string.max': 'Description must be less than 500 characters long',
  })
});

// Task update validation schema
export const updateTaskSchema = Joi.object({
  title: Joi.string().optional().min(3).max(100).messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be less than 100 characters long',
  }),
  description: Joi.string().optional().max(500).messages({
    'string.max': 'Description must be less than 500 characters long',
  }),
});

