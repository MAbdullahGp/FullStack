import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Check header x-api-key or query param api_key
    const apiKeyHeader =
      request.headers['x-api-key'] ||
      (request.headers['authorization']?.startsWith('Bearer ')
        ? request.headers['authorization'].slice(7)
        : undefined) ||
      (request.query?.['api_key'] as string | undefined);

    const validApiKey = process.env.API_KEY || 'my-secret-food-key';

    if (!apiKeyHeader || apiKeyHeader !== validApiKey) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or missing API key in x-api-key header',
        error: 'Unauthorized',
      });
    }

    return true;
  }
}
