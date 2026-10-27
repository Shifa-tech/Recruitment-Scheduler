import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity.js';
import { User } from '../user/user.entity.js';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepo: Repository<Availability>,
  ) {}

  async createAvailability(interviewer: User, startTime: Date, endTime: Date) {
    const availability = this.availabilityRepo.create({
      interviewer,
      startTime,
      endTime,
    });
    return this.availabilityRepo.save(availability);
  }

  async getAvailabilityForUser(interviewerId: string) {
    return this.availabilityRepo.find({
      where: { interviewer: { id: interviewerId } },
      order: { startTime: 'ASC' },
    });
  }
}