import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@app/src/common/decorators/get.current.userId.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user meetup' })
  getUserMeetups() {}

  @Get()
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
}
