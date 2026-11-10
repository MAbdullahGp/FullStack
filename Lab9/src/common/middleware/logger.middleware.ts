import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppRequest } from './request-id.middleware.js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: AppRequest, res: Response, next: NextFunction): void {
    const startTime = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const reqId = req.id ? req.id.slice(0, 8) : '--------';
      this.logger.log(`[${reqId}...] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    });

    next();
  }
}
