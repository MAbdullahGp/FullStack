import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import type { MenuItem } from '../menu-items/menu-item.entity.js';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cuisine: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany('MenuItem', 'restaurant', {
    cascade: true,
  })
  menuItems: MenuItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
