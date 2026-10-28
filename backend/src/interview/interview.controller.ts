import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { InterviewService } from './interview.service.js';
import { Role } from '../user/user.entity.js';
import { InterviewRound } from './interview.entity.js';
import { UserService } from '../user/user.service.js';
import { FirebaseAuthGuard } from '../auth/firebase-auth.gaurd.js';
import { RolesGuard , Roles } from '../auth/roles.gaurd.js';

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

  // Candidates can see their own upcoming interviews and interviewer names
  @Get('me')
  @UseGuards(RolesGuard)
  @Roles(Role.CANDIDATE)
  async getMyInterviews(@Req() req: any) {
    const user = await this.userService.findByFirebaseUid(req.user.uid);
    return this.interviewService.getInterviewsForCandidate(user!.id);
  }
}