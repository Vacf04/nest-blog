import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(10, 150)
  title: string;

  @IsString()
  @Length(10, 200)
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  coverImageUrl?: string;
}
