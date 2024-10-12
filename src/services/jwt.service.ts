import jwt from 'jsonwebtoken';
import { config } from '../config/config'; 

export class JWTService {
  // Sign a new JWT
  static sign(payload: object, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
  }

  // Verify and decode a JWT
  static verify(token: string): any {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
