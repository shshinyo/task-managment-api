import { Request, Response } from "express";
import { Task } from "../models";
import * as httpStatus from "http-status";
import { TaskRepoService } from "../repositories/task.repo";

import logger from "../utils/logger";
import RedisService from "../services/redis.service";

export class TaskController {
  static cacheTime: number = 3600;

  static async createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const userId = req.user?.id;

    try {
      const task = await TaskRepoService.createTask({
        title,
        description,
        userId,
      });
      logger.info(`Task Created with ID: ${task.id} `);

      res.status(httpStatus.CREATED).json({ id: task.id });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async getTasks(req: Request, res: Response) {
    const userId = req.user?.id;

    try {
      const page = parseInt(req.query.page as string) || 1;
      const size = parseInt(req.query.size as string) || 10;
      const skip = (page - 1) * size;

      const result = await TaskRepoService.getTasks({
        page,
        size,
        skip,
        userId,
      });

      res.status(httpStatus.OK).json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    try {
      //Simple example To use caching service to cache tasks .
      const cacheKey = `tasks_${id}_userId_${userId}`;
      const cachedTask = await RedisService.get(cacheKey);

      if (cachedTask) {
        const result = JSON.parse(cachedTask);
        return res.status(httpStatus.OK).json({ result, fromCache: true });
      }

      const task = await TaskRepoService.getTaskById({ id, userId });

      task &&
        (await RedisService.setex(
          cacheKey,
          JSON.stringify(task),
          TaskController.cacheTime
        ));

      return res.status(httpStatus.OK).json(task);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user?.id;

    try {
      const task = await TaskRepoService.updateTask({
        title,
        description,
        status,
        id,
        userId,
      });
      logger.info(`Task Updated with ID: ${task.id} `);

      const cacheKey = `tasks_${id}_userId_${userId}`;

      task && (await RedisService.del(cacheKey)); // delete task from cache when update .

      res.status(httpStatus.OK).json(task);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    try {
      const task = await TaskRepoService.deleteTask({ userId, id });
      res.status(httpStatus.OK).json({ message: "Task deleted successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }
}
