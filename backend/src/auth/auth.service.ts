import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import * as jwt from 'jsonwebtoken';
// import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  
  public async login(user: User): Promise<any | { status: number }> {
    try {
      const userData = await await this.userService.findByEmail(user.email);
      if (!userData) {
        throw new NotFoundException('User Not found')
      }
      const isMatch = await userData.comparePasswords(user.password);
      if(!isMatch) throw new UnauthorizedException('invalid password');
      const payload = jwt.sign({ id: userData.id, name: userData.name }, process.env.SECRET_JWT);
      return {
        access_token: payload,
        user: {
          name: userData.name,
        }
      };
    } catch (ex) {
      throw ex;
    }
  }

  public async register(user: User): Promise<any> {
    const userData = await this.userService.create(user);
    const payload = jwt.sign({ id: userData.id, name: userData.name }, process.env.SECRET_JWT);
    return {
      access_token: payload,
      user: {
        name: userData.name,
      }
    }
  }

  public async verify(payload) {
    const user = await this.userService.findById(payload.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }

}
