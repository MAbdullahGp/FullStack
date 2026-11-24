import { describe, it, expect, vi } from 'vitest';
import { RequestLoggerMiddleware } from './request-logger.middleware.js';
import type { Request, Response, NextFunction } from 'express';

describe('RequestLoggerMiddleware', () => {
  it('should call next() and log upon completion', () => {
    const middleware = new RequestLoggerMiddleware();
    const req = {
      method: 'GET',
      originalUrl: '/menu-items',
    } as Request;

    let finishCallback: () => void = () => {};
    const res = {
      statusCode: 200,
      on: vi.fn((event: string, callback: () => void) => {
        if (event === 'finish') finishCallback = callback;
      }),
    } as unknown as Response;

    const next: NextFunction = vi.fn();

    middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();

    // Trigger finish
    expect(() => finishCallback()).not.toThrow();
  });
});
