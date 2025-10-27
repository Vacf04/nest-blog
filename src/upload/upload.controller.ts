import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, limits, fileFilter } from './upload.config';
import { UploadService } from './upload.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { storage, limits, fileFilter }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleUpload(file);
  }
}
