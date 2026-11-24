import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard.js';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(() => {
    guard = new ApiKeyGuard();
    process.env.API_KEY = 'test-secret-key';
  });

  const createMockContext = (headers: Record<string, string>, query: Record<string, string> = {}): ExecutionContext => {
    const request = {
      headers,
      query,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it('should allow request when valid x-api-key header is provided', () => {
    const context = createMockContext({ 'x-api-key': 'test-secret-key' });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should reject request when x-api-key header is missing', () => {
    const context = createMockContext({});
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should reject request when x-api-key header is wrong', () => {
    const context = createMockContext({ 'x-api-key': 'wrong-key' });
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should allow Bearer token if matching API key', () => {
    const context = createMockContext({ authorization: 'Bearer test-secret-key' });
    expect(guard.canActivate(context)).toBe(true);
  });
});
