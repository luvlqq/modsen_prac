import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/decorators';
import { MeetupResponse } from '../meetups/responses';
import {
  BadRequestError,
  UnauthorizedError,
} from '../../common/swagger/responses';
import { UserResponse } from './response';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info by token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponse,
    schema: {
      $ref: getSchemaPath(UserResponse),
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      $ref: getSchemaPath(BadRequestError),
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      $ref: getSchemaPath(UnauthorizedError),
    },
  })
  getUserInfo(@GetCurrentUserId() userId: number): Promise<UserResponse> {
    return this.usersService.getUserInfo(userId);
  }

  @Post('subscribe/:meetupId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subscribe to meetup' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    schema: {
      $ref: getSchemaPath(MeetupResponse),
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      $ref: getSchemaPath(BadRequestError),
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      $ref: getSchemaPath(UnauthorizedError),
    },
  })
  async subscribeToMeetup(
    @GetCurrentUserId() userId: number,
    @Param('meetupId', ParseIntPipe) meetupId: number,
  ): Promise<MeetupResponse> {
    return this.usersService.subscribeToMeetup(userId, meetupId);
  }
}
