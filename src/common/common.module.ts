import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptjsHashingService } from './hashing/bcrypt-hash.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptjsHashingService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
