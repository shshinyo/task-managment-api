import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../services/jwt.service';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = JWTService.verify(token); // Use JWTService for verification
    req.user = decoded; // Assuming the token contains user data
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
