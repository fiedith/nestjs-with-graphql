import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],

  providers: [
    UsersResolver, //
    UsersService,
  ],

  // AuthService에서 UsersModule 자체를 import해서 사용할 예정
  // 이때 UsersModule 안에 같이 포함시켜서 같이 export하도록 함
  // 그래야 AuthService에서 UsersService 기능을 활용할 수 있음
  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
