import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview, InterviewRound, InterviewStatus } from './interview.entity.js';
import { User } from '../user/user.entity.js';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepo: Repository<Interview>,
  ) {}

  // Create a new interview slot
  async createInterview(candidate: User, interviewer: User, round: InterviewRound) {
    const interview = this.interviewRepo.create({
      candidate,
      interviewer,
      round,
      status: InterviewStatus.OPTIONS_OFFERED, // Waiting for candidate to pick a time
    });

    return this.interviewRepo.save(interview);
  }

  // Get all interviews for a specific candidate (WITH NAMES)
  async getInterviewsForCandidate(candidateId: string) {
    return this.interviewRepo.find({
      where: { candidate: { id: candidateId } },
      relations: { interviewer: true, room: true }, //  Fetches the interviewer's details!
      order: { round: 'ASC' },
    });
  }
}