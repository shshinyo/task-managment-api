import { Request, Response, NextFunction } from "express";

export const authorizeRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user!.role;

    if (!userRole) return res.status(401).json({ message: "Unauthorized" });

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
