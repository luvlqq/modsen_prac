import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '@app/src/auth/dto/auth.dto';
import { Tokens } from '@app/src/auth/types/tokens';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user account' })
  register(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in as a user to your account' })
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Get('signOut')
  @ApiOperation({ summary: 'Sign out from account' })
  signOut() {
    return this.authService.signOut();
  }

  @Post('refresh')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
