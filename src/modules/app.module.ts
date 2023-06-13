import { Module } from '@nestjs/common';
import { AuthModule } from '@app/src/modules/auth/auth.module';
import { MeetupsModule } from '@app/src/modules/meetups/meetups.module';
import { UsersModule } from '@app/src/modules/users/users.module';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { PrismaModule } from '@app/src/modules/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@app/src/common/guards/at.guard';

@Module({
  imports: [AuthModule, MeetupsModule, UsersModule, PrismaModule],
  providers: [
    PrismaService,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
