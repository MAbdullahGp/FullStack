import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { NotesModule } from './notes/notes.module.js';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';

@Module({
  imports: [UsersModule, AuthModule, NotesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware, LoggerMiddleware)
      .forRoutes('*');
  }
}
