import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './menu-item.entity.js';
import { MenuItemsService } from './menu-items.service.js';
import { MenuItemsController } from './menu-items.controller.js';
import { Restaurant } from '../restaurants/restaurant.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Restaurant])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
  exports: [MenuItemsService, TypeOrmModule],
})
export class MenuItemsModule {}
