import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { credntials } from './interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser({ username, password }: credntials): Promise<any> {
    const user = this.userService.getAuthenticatedUser(username, password);

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
