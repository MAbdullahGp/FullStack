import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module.js';
import { Book } from './books/book.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'superuser',
      database: process.env.DB_DATABASE || 'library_tracker',
      entities: [Book],
      synchronize: false, // Table already created with SERIAL id in PostgreSQL
    }),
    BooksModule,
  ],
})
export class AppModule {}
