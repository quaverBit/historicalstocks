import { Controller, Post, Body, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user/user.entity';
import { AuthNavigation } from './auth.navigation'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(AuthNavigation.REGISTER)
  async register(@Body() user: User, @Request() req): Promise<any> {
    const toSend = await this.authService.login(user);
    req.user = toSend.user;
    return toSend;
  }

  @Post(AuthNavigation.LOGIN)
  async login(@Body() user: User, @Request() req, @Param() test): Promise<any> {
    console.log(test);
    const toSend = await this.authService.login(user);
    req.user = toSend.user;
    return toSend;
  }
}
