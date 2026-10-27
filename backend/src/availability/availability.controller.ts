import { Controller, Post, Body, Get, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AvailabilityService } from './availability.service.js';
import { Role } from '../user/user.entity.js';
import { UserService } from '../user/user.service.js';
import { FirebaseAuthGuard } from '../auth/firebase-auth.gaurd.js';
import { Roles , RolesGuard } from '../auth/roles.gaurd.js';

@Controller('availability')
@UseGuards(FirebaseAuthGuard) // Every route here requires login
export class AvailabilityController {
  constructor(
    private availabilityService: AvailabilityService,
    private userService: UserService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.INTERVIEWER) // ONLY interviewers can create availability
  async addAvailability(
    @Req() req: any,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    const user = await this.userService.findByFirebaseUid(req.user.uid);
    
    if (!user) throw new ForbiddenException('User not found');

    return this.availabilityService.createAvailability(
      user,
      new Date(startTime),
      new Date(endTime),
    );
  }

  @Get('me')
  async getMyAvailability(@Req() req: any) {
    const user = await this.userService.findByFirebaseUid(req.user.uid);
    return this.availabilityService.getAvailabilityForUser(user.id);
  }
}