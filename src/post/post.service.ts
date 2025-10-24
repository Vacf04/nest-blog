import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(author: User, dto: CreatePostDto) {
    const newPost = this.postRepository.create({
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      author,
    });

    return await this.postRepository.save(newPost);
  }
}
