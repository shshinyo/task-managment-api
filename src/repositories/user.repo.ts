import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { JWTService } from "../services/jwt.service";
import { config } from "../config/config";
import * as httpStatus from "http-status";
import { ILoginDto, IRegisterUserDto, IUpdateProfileDto } from "./DTOs";

export class UserRepoService {
  static async register(registerCriteria: IRegisterUserDto) {
    const { username, email, hashedPassword } = registerCriteria;

    try {
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  static async getProfile(id: string | undefined) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  static async updateProfile(updateDo: IUpdateProfileDto) {
    const { username, email, userId } = updateDo;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  static async deleteAccount(id: string|undefined) {
    try {
      const res = await User.findByIdAndDelete(id);
      return res;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }
}
