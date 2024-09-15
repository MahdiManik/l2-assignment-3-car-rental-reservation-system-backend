/* eslint-disable @typescript-eslint/no-explicit-any */
// import express from 'express';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: Record<string, any>;
//     }
//   }
// }

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
      token?: string;
    }
  }
}
