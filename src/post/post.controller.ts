import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-requests';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async readAllPostPublic() {
    const posts = await this.postService.readAllPostPublic();
    return posts.map((post) => new PostResponseDto(post));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async readAllPostOwned(@Req() req: AuthenticatedRequest) {
    const posts = await this.postService.readAllPostOwned(req.user.id);
    return posts.map((post) => new PostResponseDto(post));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/:slug')
  async readOnePostOwned(
    @Req() req: AuthenticatedRequest,
    @Param('slug') slug: string,
  ) {
    const post = await this.postService.readOnePostOwned(req.user.id, slug);
    return new PostResponseDto(post);
  }

  @Get(':slug')
  async readOnePostPublic(@Param('slug') slug: string) {
    const post = await this.postService.readOnePostPublic(slug);
    return new PostResponseDto(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePostDto) {
    const post = await this.postService.create(req.user, dto);
    return new PostResponseDto(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/:slug')
  async update(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePostDto,
    @Param('slug') slug: string,
  ) {
    const post = await this.postService.update(slug, dto, req.user);
    return new PostResponseDto(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me/:slug')
  async remove(@Req() req: AuthenticatedRequest, @Param('slug') slug: string) {
    const post = await this.postService.remove(slug, req.user);
    return new PostResponseDto(post);
  }
}
