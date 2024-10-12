import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/jwt/JWT-authentication.middleware';
import validateRequest from '../middlewares/validationMiddleware';
import { registerUserSchema, updateUserSchema, loginUserSchema } from '../validators/userValidator';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


// User registration
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', validateRequest(registerUserSchema),UserController.register);

// User login
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login',validateRequest(loginUserSchema), UserController.login);

// Get user profile (requires authentication)
/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/profile', authenticateJWT, UserController.getProfile);

// update user profile (requires authentication)

/**
 * @swagger
 *  /users/profile:
 *    put:
 *      tags: [Users]
 *      summary: Update user profile
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: test
 *                email:
 *                  type: string
 *                  example: test@test.com
 *      responses:
 *        204:
 *          description: User profile updated successfully
 *        401:
 *          description: Unauthorized
 *        400:
 *          description: Invalid input
 */
router.put('/profile', authenticateJWT, validateRequest(updateUserSchema), UserController.updateProfile);

// delete user profile (requires authentication)

/**
 * @swagger
 *  /users/profile:
 *    delete:
 *      tags: [Users]
 *      summary: Delete user profile
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        204:
 *          description: User profile deleted successfully
 *        401:
 *          description: Unauthorized
 */
router.delete('/profile', authenticateJWT, UserController.deleteAccount);

export const userRouter = router;
