import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity.js';
import { AvailabilityService } from './availability.service.js';
import { AvailabilityController } from './availability.controller.js';
import { UserModule } from '../user/user.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { Room } from '../room/room.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Availability , Room]),
    UserModule,
    AuthModule, //  Needed so we can use FirebaseAuthGuard and RolesGuard
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}