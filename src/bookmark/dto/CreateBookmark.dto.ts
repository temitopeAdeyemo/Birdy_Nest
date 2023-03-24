import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  link: string;
}
