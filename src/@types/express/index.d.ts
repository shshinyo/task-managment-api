// src/types/express/index.d.ts

import { IUser } from '../../../src/models';

declare global {
  namespace Express {
    interface Request {
       user?: {
        id: string; 
        role?: string; 
      };
    }
  }
}
