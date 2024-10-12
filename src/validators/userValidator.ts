import Joi from 'joi';

// User registration validation schema
export const registerUserSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be less than 30 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Must be a valid email',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
  role: Joi.string()
  .valid('admin', 'regular')
  .required().messages({
    'string.valid': 'role should be admin or regular',
  }),
});

// User profile update validation schema
export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be less than 30 characters long',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Must be a valid email',
  }),
});


// User login update validation schema
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Must be a valid email',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});


