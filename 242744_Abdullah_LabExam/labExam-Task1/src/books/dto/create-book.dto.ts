import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required and cannot be empty' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required and cannot be empty' })
  author!: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required and cannot be empty' })
  category!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Year must be a valid number' })
  @Min(1000, { message: 'Year must be greater than or equal to 1000' })
  @Max(2100, { message: 'Year must be less than or equal to 2100' })
  year!: number;
}
