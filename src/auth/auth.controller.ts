import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in as a user to your account' })
  login() {}

  @Post('register')
  @ApiOperation({ summary: 'Register user account' })
  register() {}

  @Get('signout')
  @ApiOperation({ summary: 'Sign out from account' })
  signOut() {}
}
