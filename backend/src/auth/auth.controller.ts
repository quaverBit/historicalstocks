import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() user: User, @Request() req): Promise<any> {
    const toSend = await this.authService.login(user);
    req.user = toSend.user;
    return toSend;
  }

  @Post('login')
  async login(@Body() user: User, @Request() req): Promise<any> {
    const toSend = await this.authService.login(user);
    req.user = toSend.user;
    return toSend;
  }
}
