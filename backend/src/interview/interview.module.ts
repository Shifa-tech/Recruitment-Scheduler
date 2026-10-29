import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview.entity.js';
import { Result } from './result.entity.js';
import { InterviewService } from './interview.service.js';
import { InterviewController } from './interview.controller.js';
import { UserModule } from '../user/user.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { ProposedSlot } from './proposed-slot.entity.js';
import { RoomModule } from '../room/room.module.js';
import { SchedulingService } from './scheduling.service.js';
import { Room } from '../room/room.entity.js';
import { Availability } from '../availability/availability.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview, Result , ProposedSlot ,Availability, Room]),
    UserModule,
    AuthModule,
    RoomModule,
  ],
  controllers: [InterviewController],
  providers: [InterviewService , SchedulingService],
})
export class InterviewModule {}