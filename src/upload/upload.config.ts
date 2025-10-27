import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const storage = memoryStorage();

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new BadRequestException('Only images can be send.'), false);
  }
  cb(null, true);
};

export const limits = {
  fileSize: 900 * 1024,
};
