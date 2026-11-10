import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export interface AppRequest extends Request {
  id?: string;
  user?: any;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction): void {
    const requestId = randomUUID();
    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
  }
}
