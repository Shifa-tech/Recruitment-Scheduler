import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview, InterviewRound, InterviewStatus } from './interview.entity.js';
import { User } from '../user/user.entity.js';
import {SchedulingService } from './scheduling.service.js';
import { Room } from '../room/room.entity.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepo: Repository<Interview>,
    @InjectRepository(Room) //  We will need this later to save the Room
    private roomRepo: Repository<Room>,
    private schedulingService: SchedulingService,
    private userService: UserService,
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
      relations: { interviewer: true, room: true }, // 👈 Fetches the interviewer's details!
      order: { round: 'ASC' },
    });
  }
  async processCandidateForm(skills: string[], round: InterviewRound, candidateId: string) {
    // 1. Save the skills to the candidate's profile
    await this.userService.updateCandidateSkills(candidateId, skills);

    // 2. Loop through the skills to find the first available match
    for (const skill of skills) {
      const result = await this.schedulingService.findMatchesForCandidate(skills, round);
      
      // If the C++ engine found a match for this skill, return it immediately
      if (result.success && result.matches && result.matches.length > 0) {
        return result;
      }
    }

    // 3. If the loop finishes and no skills matched, return an error
    return { success: false, error: "NO_MATCHES_FOUND_FOR_ANY_SKILL" };
  }

  async confirmSlot(
    candidateId: string,
    interviewerId: string,
    startTime: string,
    endTime: string,
    round: InterviewRound,
  ) {
    const candidate = await this.userService.findById(candidateId);
    const interviewer = await this.userService.findById(interviewerId);

    if (!candidate || !interviewer) {
      throw new NotFoundException('Candidate or Interviewer not found');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    const room = await this.roomRepo.findOne({ where: {} }); 
    if (!room) throw new NotFoundException('No rooms exist in the system');

    const conflict = await this.interviewRepo.findOne({
      where: {
        interviewer: { id: interviewerId },
        startTime: start,
        status: InterviewStatus.SCHEDULED,
      },
    });

    if (conflict) {
      throw new BadRequestException('Interviewer is already booked for this slot');
    }

    const interview = this.interviewRepo.create({
      candidate,
      interviewer,
      room,
      round,
      startTime: start,
      endTime: end,
      status: InterviewStatus.SCHEDULED,
    });

    return this.interviewRepo.save(interview);
  }

  async cancelInterview(interviewId: string , interviewerId : string) {
    const interview = await this.interviewRepo.findOne({
      where: { id: interviewId },
      relations : {interviewer : true}
    });
    if (!interview) throw new NotFoundException('Interview not found');

    if (interview.interviewer.id !== interviewerId) {
      throw new ForbiddenException('You can only cancel your own interviews');
    }
    // 1. Change status to CANCELLED
    interview.status = InterviewStatus.CANCELLED;
    await this.interviewRepo.save(interview);

    // 2. The "Ripple Effect" logic:
    // In a real app, you would trigger an email here to the candidate 
    // saying "Your interview was cancelled, please book a new slot."
    
    return {
      success: true,
      message: 'Interview cancelled. Candidate notified to reschedule.',
      interview,
    };
  }

    // 1. Get ALL interviews (for Coordinators)
  async getAllInterviews() {
    return this.interviewRepo.find({
      relations: { candidate: true, interviewer: true, room: true },
      order: { startTime: 'ASC' },
    });
  }

  // 2. Cancel an interview (from Coordinator side)
  async coordinatorCancelInterview(interviewId: string) {
    const interview = await this.interviewRepo.findOne({ where: { id: interviewId } });
    if (!interview) throw new NotFoundException('Interview not found');

    interview.status = InterviewStatus.CANCELLED;
    await this.interviewRepo.save(interview);
    return { success: true, message: 'Interview cancelled by Coordinator' };
  }
  
}