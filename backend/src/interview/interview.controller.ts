import { Controller, Post, Get, Body, UseGuards, Req, Patch, Param, ForbiddenException } from '@nestjs/common';
import { InterviewService } from './interview.service.js';
import { Role } from '../user/user.entity.js';
import { InterviewRound } from './interview.entity.js';
import { UserService } from '../user/user.service.js';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard.js';
import { RolesGuard , Roles } from '../auth/roles.guard.js';

@Controller('interviews')
@UseGuards(FirebaseAuthGuard)
export class InterviewController {
  constructor(
    private interviewService: InterviewService,
    private userService: UserService,
  ) {}

  // Only Coordinators can create an interview mapping
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.COORDINATOR)
  async create(
    @Body('candidateId') candidateId: string,
    @Body('interviewerId') interviewerId: string,
    @Body('round') round: InterviewRound,
  ) {
    const candidate = await this.userService.findById(candidateId);
    const interviewer = await this.userService.findById(interviewerId);

    if (!candidate || !interviewer) throw new Error('User not found');

    return this.interviewService.createInterview(candidate, interviewer, round);
  }

  //  NEW: Coordinator cancels an interview (Triggers Ripple Effect)
  @Patch(':id/cancel')
  @UseGuards(RolesGuard)
  @Roles(Role.INTERVIEWER)
  async cancelInterview(@Param('id') interviewId: string, @Req() req: any) {
    const interviewer = await this.userService.findByFirebaseUid(req.user.uid);
    if (!interviewer) throw new ForbiddenException('Interviewer not found');

    return this.interviewService.cancelInterview(interviewId, interviewer.id);
  }

  // Candidates can see their own upcoming interviews and interviewer names
  @Get('me')
  @UseGuards(RolesGuard)
  @Roles(Role.CANDIDATE)
  async getMyInterviews(@Req() req: any) {
    const user = await this.userService.findByFirebaseUid(req.user.uid);
    return this.interviewService.getInterviewsForCandidate(user!.id);
  }

  @Post('request')
  @UseGuards(RolesGuard)
  @Roles(Role.CANDIDATE)
  async requestInterview(
    @Req() req: any,
    @Body('requiredSkill') requiredSkill: string,
    @Body('round') round: InterviewRound,
  ) {
    const candidate = await this.userService.findByFirebaseUid(req.user.uid);
    if (!candidate) throw new Error('Candidate not found');
    return this.interviewService.processCandidateForm(requiredSkill, round);
  }

  @Post('confirm')
  @UseGuards(RolesGuard)
  @Roles(Role.CANDIDATE)
  async confirmSlot(
    @Req() req: any,
    @Body('interviewerId') interviewerId: string,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('round') round: InterviewRound,
  ) {
    const candidate = await this.userService.findByFirebaseUid(req.user.uid);
    if (!candidate) throw new Error('Candidate not found');

    return this.interviewService.confirmSlot(
      candidate.id,
      interviewerId,
      startTime,
      endTime,
      round,
    );
  }
}