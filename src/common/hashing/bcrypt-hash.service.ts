import bcrypt from 'node_modules/bcryptjs';
import { HashingService } from './hashing.service';

export class BcryptjsHashingService extends HashingService {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  async compare(password: string, hash: string) {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  }
}
