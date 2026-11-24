import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Book } from './book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  private readonly jsonFilePath = path.resolve(process.cwd(), 'data', 'books.json');

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  // Sync current database state to data/books.json
  private async syncToJsonFile(): Promise<void> {
    try {
      const allBooks = await this.booksRepository.find({
        order: { id: 'ASC' },
      });
      const tempPath = `${this.jsonFilePath}.tmp.${Date.now()}`;
      await fs.mkdir(path.dirname(this.jsonFilePath), { recursive: true });
      await fs.writeFile(tempPath, JSON.stringify(allBooks, null, 2), 'utf-8');
      await fs.rename(tempPath, this.jsonFilePath);
    } catch (error) {
      console.warn(`[BooksService] Notice: Could not sync to data/books.json: ${(error as Error).message}`);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.booksRepository.find({
        order: { id: 'ASC' },
      });
      return books;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve books from database: ${(error as Error).message}`,
      );
    }
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const newBook = this.booksRepository.create({
        title: createBookDto.title.trim(),
        author: createBookDto.author.trim(),
        category: createBookDto.category.trim(),
        year: Number(createBookDto.year),
      });

      const savedBook = await this.booksRepository.save(newBook);
      await this.syncToJsonFile();
      return savedBook;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create book in database: ${(error as Error).message}`,
      );
    }
  }

  async remove(id: number): Promise<{ success: boolean; message: string; id: number }> {
    const book = await this.findOne(id);
    try {
      await this.booksRepository.remove(book);
      await this.syncToJsonFile();
      return {
        success: true,
        message: `Book with ID "${id}" deleted successfully`,
        id,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete book from database: ${(error as Error).message}`,
      );
    }
  }
}
