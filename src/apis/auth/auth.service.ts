import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // fetch user by email and validate if email exists
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('Email does not exist');

    // validate password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('Wrong password');

    // if no exceptions occurred, create and send jwt accessToken to browser
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'my-access', expiresIn: '1h' },
    );
  }
}
