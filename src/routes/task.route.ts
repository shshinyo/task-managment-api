import { Router } from "express";
import { TaskController } from "../controllers";
import { authenticateJWT, authorizeRole } from "../middlewares";
import {
  updateTaskSchema,
  createTaskSchema,
} from "../validators/taskValidator";
import validateRequest from "../middlewares/validationMiddleware";
import { config } from "../config/config";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

// Create a new task
/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  authenticateJWT, authorizeRole(config.roles.authorizedRoles),
  validateRequest(createTaskSchema),
  TaskController.createTask
);

// Get all tasks for the authenticated user

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks with pagination
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         required: false
 *         description: The number of tasks to return per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A paginated list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 size:
 *                   type: integer
 *                 totalTasks:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authenticateJWT,authorizeRole(config.roles.authorizedRoles), TaskController.getTasks);

// Get a specific task by ID
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateJWT,authorizeRole(config.roles.authorizedRoles), TaskController.getTaskById);

// Update a specific task by ID
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authenticateJWT,authorizeRole(config.roles.authorizedRoles),
  validateRequest(updateTaskSchema),
  TaskController.updateTask
);

// Delete a specific task by ID
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  authenticateJWT,authorizeRole(config.roles.authorizedRoles),
  TaskController.deleteTask
);

export const taskRouter = router;
