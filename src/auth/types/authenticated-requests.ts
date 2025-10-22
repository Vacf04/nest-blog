import { Request } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
