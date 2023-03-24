import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @Optional()
  @IsString()
  description: string;

  @Optional()
  @IsString()
  title: string;

  @Optional()
  @IsString()
  link: string;
}
