import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '@app/src/auth/dto/auth.dto';
import { Tokens } from '@app/src/auth/types/tokens';
import { GetCurrentUserId } from '@app/src/common/decorators/get.current.userId.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user account' })
  register(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in as a user to your account' })
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('signOut')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out from account' })
  signOut(@GetCurrentUserId() userId: number) {
    return this.authService.signOut(userId);
  }
}
