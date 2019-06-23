import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule.register({
        defaultStrategy: 'jwt',

      }),
      JwtModule.register({
        secret: 'thisisasecret',
      }),
    ],
    providers: [UserService, AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}