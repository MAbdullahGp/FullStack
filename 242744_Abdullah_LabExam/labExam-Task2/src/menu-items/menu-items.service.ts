import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity.js';
import { CreateMenuItemDto } from './dto/create-menu-item.dto.js';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto.js';
import { Restaurant } from '../restaurants/restaurant.entity.js';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(restaurantId?: number): Promise<MenuItem[]> {
    const query = this.menuItemRepository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.restaurant', 'restaurant');

    if (restaurantId) {
      query.where('menuItem.restaurantId = :restaurantId', { restaurantId });
    }

    return query.orderBy('menuItem.id', 'ASC').getMany();
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: { restaurant: true },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createMenuItemDto.restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${createMenuItemDto.restaurantId} not found`,
      );
    }

    const menuItem = this.menuItemRepository.create({
      ...createMenuItemDto,
      restaurant,
    });

    return this.menuItemRepository.save(menuItem);
  }

  async update(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);

    if (updateMenuItemDto.restaurantId) {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: updateMenuItemDto.restaurantId },
      });
      if (!restaurant) {
        throw new NotFoundException(
          `Restaurant with ID ${updateMenuItemDto.restaurantId} not found`,
        );
      }
      menuItem.restaurant = restaurant;
      menuItem.restaurantId = updateMenuItemDto.restaurantId;
    }

    if (updateMenuItemDto.name !== undefined) {
      menuItem.name = updateMenuItemDto.name;
    }
    if (updateMenuItemDto.description !== undefined) {
      menuItem.description = updateMenuItemDto.description;
    }
    if (updateMenuItemDto.price !== undefined) {
      menuItem.price = updateMenuItemDto.price;
    }
    if (updateMenuItemDto.category !== undefined) {
      menuItem.category = updateMenuItemDto.category;
    }

    return this.menuItemRepository.save(menuItem);
  }

  async remove(id: number): Promise<{ message: string; deletedId: number }> {
    const menuItem = await this.findOne(id);
    await this.menuItemRepository.remove(menuItem);
    return {
      message: `Menu item with ID ${id} deleted successfully`,
      deletedId: id,
    };
  }
}
