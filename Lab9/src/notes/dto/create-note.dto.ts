import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, { message: 'tags cannot contain more than 5 items' })
  @IsString({ each: true, message: 'each tag must be a string' })
  @MaxLength(20, { each: true, message: 'each tag must be at most 20 characters' })
  tags?: string[];
}
