import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { JWTService } from "../services/jwt.service";
import { config } from "../config/config";
import * as httpStatus from "http-status";
import { UserRepoService } from "../repositories/user.repo";
import logger from '../utils/logger';


export class UserController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await UserRepoService.getUserByEmail( email );

      if (existingUser) {
        logger.warn(`Attempt to register with an existing email: ${email}`);
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'User with this email already exists.' });
    }

      const hashedPassword = await bcrypt.hash(
        password,
        config.encryption.salt
      );
     const Res =  await UserRepoService.register({ username, email, hashedPassword });
      logger.info(`New User registered with ID: ${Res.id} `);

      res
        .status(httpStatus.CREATED)
        .json({ message: "User registered successfully", id : Res.id });
    } catch (error) {
      const errorMessage = (error as Error).message;

      res.status(httpStatus.BAD_REQUEST).json({ error: errorMessage });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserRepoService.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ error: "Invalid credentials" });
      }
      const token = JWTService.sign({ id: user._id, role: user.role });

      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      const errorMessage = (error as Error).message;

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await UserRepoService.getProfile(userId);
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(httpStatus.OK).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    const { username, email } = req.body;
    const userId = req.user?.id;

    try {
      const user = await UserRepoService.updateProfile({
        username,
        email,
        userId,
      });
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(httpStatus.OK).json( user );
    } catch (error) {
      const errorMessage = (error as Error).message;

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    const userId = req.user?.id;

    try {
      const user = await UserRepoService.deleteAccount(userId);
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res
        .status(httpStatus.OK)
        .json({ message: "User account deleted successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }
}
