import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Note } from './note.entity.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private idCounter = 1;

  constructor() {
    // Seed initial notes for testing
    this.notes.push({
      id: this.idCounter++,
      title: 'Zebra Note',
      content: 'This note starts with Z',
      tags: ['animals', 'nature'],
      userId: 2, // Owned by normal user (id: 2)
      createdAt: new Date(),
    });

    this.notes.push({
      id: this.idCounter++,
      title: 'Apple Note',
      content: 'This note starts with A',
      tags: ['fruit'],
      userId: 2, // Owned by normal user (id: 2)
      createdAt: new Date(),
    });
  }

  create(userId: number, createNoteDto: CreateNoteDto): Note {
    const note: Note = {
      id: this.idCounter++,
      title: createNoteDto.title,
      content: createNoteDto.content,
      tags: createNoteDto.tags || [],
      userId,
      createdAt: new Date(),
    };
    this.notes.push(note);
    return note;
  }

  findAll(userId: number, order: 'asc' | 'desc' = 'asc'): Note[] {
    const userNotes = this.notes.filter((note) => note.userId === userId);

    return userNotes.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  findById(id: number): Note {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    user: { sub: number; role: string },
  ): Note {
    const note = this.findById(id);

    // Only the owner or an admin may update
    if (note.userId !== user.sub && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this note');
    }

    if (updateNoteDto.title !== undefined) {
      note.title = updateNoteDto.title;
    }
    if (updateNoteDto.content !== undefined) {
      note.content = updateNoteDto.content;
    }
    if (updateNoteDto.tags !== undefined) {
      note.tags = updateNoteDto.tags;
    }

    return note;
  }
}
