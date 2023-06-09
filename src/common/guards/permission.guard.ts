import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@app//prisma/prisma.service';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const meetupId = parseInt(request.params.id, 10);

    const meetupOwner = await this.prisma.meetup.findUnique({
      where: { id: meetupId },
      select: { meetupCreator: true },
    });

    if (userId !== meetupOwner.meetupCreator) {
      throw new HttpException('Access denied!', 403);
    }

    return true;
  }
}
