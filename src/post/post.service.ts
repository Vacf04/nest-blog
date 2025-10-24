import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { createSlugFromText } from './utils/create-slug-from-text';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(author: User, dto: CreatePostDto) {
    const post = this.postRepository.create({
      slug: createSlugFromText(dto.title),
      author,
      content: dto.content,
      excerpt: dto.excerpt,
      coverImageUrl: dto.coverImageUrl,
      title: dto.title,
    });

    const created = await this.postRepository
      .save(post)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar post', err.stack);
        }

        throw new BadRequestException('Erro ao criar o post');
      });

    return created;
  }

  async readAllPostPublic() {
    const posts = await this.postRepository.find({
      where: { published: true },
      relations: ['author'],
    });

    if (!posts || posts.length <= 0) {
      throw new NotFoundException('Posts not found.');
    }

    return posts;
  }

  async readOnePostPublic(slug: string) {
    const post = await this.postRepository.findOne({
      where: {
        published: true,
        slug,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  async readOnePostOwned(userId: string, slug: string) {
    const post = await this.postRepository.findOne({
      where: {
        slug,
        author: { id: userId },
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  async readAllPostOwned(userId: string) {
    const posts = await this.postRepository.find({
      where: {
        author: { id: userId },
      },
      relations: ['author'],
    });

    return posts;
  }
}
