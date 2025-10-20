import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(body: LoginDto) {
    console.log(body);
    return 'Olá do AuthService';
  }
}
