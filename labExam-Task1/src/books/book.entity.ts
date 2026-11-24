import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  author!: string;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'integer' })
  year!: number;
}
