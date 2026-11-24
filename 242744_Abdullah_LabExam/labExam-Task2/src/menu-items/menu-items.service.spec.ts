import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MenuItemsService } from './menu-items.service.js';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity.js';
import { Restaurant } from '../restaurants/restaurant.entity.js';
import { NotFoundException } from '@nestjs/common';

describe('MenuItemsService', () => {
  let service: MenuItemsService;
  let menuItemRepo: Partial<Repository<MenuItem>>;
  let restaurantRepo: Partial<Repository<Restaurant>>;

  beforeEach(() => {
    menuItemRepo = {
      find: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn().mockImplementation((dto) => dto as MenuItem),
      save: vi.fn().mockImplementation(async (item) => ({ id: 1, ...item })),
      remove: vi.fn().mockImplementation(async (item) => item),
      createQueryBuilder: vi.fn().mockReturnValue({
        leftJoinAndSelect: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        getMany: vi.fn().mockResolvedValue([
          { id: 1, name: 'Burger', price: 9.99, restaurantId: 1 },
        ]),
      }),
    };

    restaurantRepo = {
      findOne: vi.fn().mockImplementation(async ({ where }) => {
        if (where.id === 1) {
          return { id: 1, name: 'Burger Queen', cuisine: 'Fast Food', address: '123 St' } as Restaurant;
        }
        return null;
      }),
    };

    service = new MenuItemsService(
      menuItemRepo as Repository<MenuItem>,
      restaurantRepo as Repository<Restaurant>,
    );
  });

  it('should find all menu items', async () => {
    const items = await service.findAll();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Burger');
  });

  it('should throw NotFoundException when creating item for non-existent restaurant', async () => {
    await expect(
      service.create({
        name: 'Fries',
        price: 3.5,
        restaurantId: 999,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create menu item when restaurant exists', async () => {
    const result = await service.create({
      name: 'Cheeseburger',
      price: 11.5,
      restaurantId: 1,
    });
    expect(result.id).toBe(1);
    expect(result.name).toBe('Cheeseburger');
  });
});
