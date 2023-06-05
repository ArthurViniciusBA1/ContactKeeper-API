import { Body, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user.email);
  }
}
