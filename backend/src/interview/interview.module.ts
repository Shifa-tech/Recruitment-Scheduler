import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview.entity.js';
import { Result } from './result.entity.js';
import { Availability } from '../availability/availability.entity.js';
import { User } from '../user/user.entity.js'; 
import { InterviewService } from './interview.service.js';
import { InterviewController } from './interview.controller.js';
import { SchedulingService } from './scheduling.service.js';
import { UserModule } from '../user/user.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview, Result, Availability, User]),
    UserModule,
    AuthModule,
  ],
  controllers: [InterviewController],
  providers: [InterviewService, SchedulingService],
})
export class InterviewModule {}