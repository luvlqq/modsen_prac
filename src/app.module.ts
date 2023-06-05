import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, MeetupsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
