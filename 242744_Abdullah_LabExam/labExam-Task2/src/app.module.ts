import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module.js';
import { MenuItemsModule } from './menu-items/menu-items.module.js';
import { Restaurant } from './restaurants/restaurant.entity.js';
import { MenuItem } from './menu-items/menu-item.entity.js';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'superuser',
      database: process.env.DB_DATABASE || 'food_ordering_db',
      entities: [Restaurant, MenuItem],
      synchronize: false, // Matches exact schema manually created in PostgreSQL
    }),
    RestaurantsModule,
    MenuItemsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('menu-items');
  }
}
