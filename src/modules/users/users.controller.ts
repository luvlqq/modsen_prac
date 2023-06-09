import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserId } from '@app/src/common/decorators/get.current.userId.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info by token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getUserInfo(@GetCurrentUserId() userId: number) {
    return this.usersService.getUserInfo(userId);
  }

  @Post('subscribe/:meetupId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subscribe to meetup' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async subscribeToMeetup(
    @GetCurrentUserId() userId: number,
    @Param('meetupId') meetupId: number,
  ) {
    return this.usersService.subscribeToMeetup(userId, meetupId);
  }
}
