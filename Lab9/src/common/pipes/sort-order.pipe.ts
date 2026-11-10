import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SortOrderPipe implements PipeTransform<string | undefined, 'asc' | 'desc'> {
  transform(value?: string): 'asc' | 'desc' {
    if (!value || value.trim() === '') {
      return 'asc';
    }

    const normalized = value.toLowerCase();
    if (normalized === 'asc' || normalized === 'desc') {
      return normalized;
    }

    throw new BadRequestException('order must be asc or desc');
  }
}
