import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '../common/guards';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    AuthModule,
    MeetupsModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
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
