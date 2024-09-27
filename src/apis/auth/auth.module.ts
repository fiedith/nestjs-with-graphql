import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // AuthService에서 UsersService를 주입받기 때문에 import UsersModule
  // Module을 통째로 import해야 TypeOrmRepository도 사용 가능함
  imports: [
    JwtModule.register({}),
    UsersModule, //
  ],

  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
