import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { SortOrderPipe } from '../common/pipes/sort-order.pipe.js';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe.js';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Req() req: any, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(req.user.sub, createNoteDto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('order', SortOrderPipe) order: 'asc' | 'desc',
  ) {
    return this.notesService.findAll(req.user.sub, order);
  }

  @Patch(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: any,
  ) {
    return this.notesService.update(id, updateNoteDto, req.user);
  }
}
