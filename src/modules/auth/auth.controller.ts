import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId } from '../../common/decorators';
import { Public } from '../../common/decorators';
import { RtGuard } from '@app/src/common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user account' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  register(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in as a user to your account' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect data',
  })
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('signOut')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out from account' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  signOut(@GetCurrentUserId() userId: number) {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
