import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByemail(loginDto.email);
    const invalidCredentialsError = new UnauthorizedException(
      'Invalid user or password.',
    );

    if (!user) {
      throw invalidCredentialsError;
    }

    const match = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!match) {
      throw invalidCredentialsError;
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    user.forceLogout = false;
    await this.userService.save(user);

    return {
      accessToken,
    };
  }
}
