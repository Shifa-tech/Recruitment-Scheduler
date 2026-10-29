import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , In } from 'typeorm';
import { spawn } from 'child_process';
import { Role } from '../user/user.entity.js';
import { Availability } from '../availability/availability.entity.js';
import * as path from 'path';
import { UserService } from '../user/user.service.js';

@Injectable()
export class SchedulingService {
  constructor(
    private userService: UserService,
    @InjectRepository(Availability)
    private availabilityRepo: Repository<Availability>,
  ) {}

  // 1. Gather ALL data and send to C++
  async findMatchesForCandidate(requiredSkill: string, round: string) {
    const interviewers = await this.userService.findAllInterviewers();

    if (interviewers.length === 0) {
      return { success: false, error: 'NO_INTERVIEWERS_IN_SYSTEM' };
    }

    const interviewerIds = interviewers.map(i => i.id);

    const availabilities = await this.availabilityRepo.find({
      where: { interviewer: { id: In(interviewerIds) } },
      relations: { interviewer: true },
    });

    // 2. Format data for C++ (No filtering here!)
    const cppInput = {
      requiredSkill,
      round,
      interviewers: interviewers.map(int => ({
        id: int.id,
        name: int.name,
        skills: int.skills || [],
        availability: availabilities
          .filter(a => a.interviewer?.id === int.id)
          .map(a => ({ start: a.startTime.toISOString(), end: a.endTime.toISOString() }))
      }))
    };

    // 3. Call C++ Engine
    return await this.runCppAlgorithm(cppInput);
  }

  private runCppAlgorithm(inputJson: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const exePath = path.resolve(process.cwd(), 'cpp_engine', 'scheduler.exe'); 
      const cppProcess = spawn(exePath);

      let outputData = '';
      let errorData = '';

      // Send JSON to C++ stdin
      cppProcess.stdin.write(JSON.stringify(inputJson));
      cppProcess.stdin.end();

      // Listen to C++ stdout
      cppProcess.stdout.on('data', (data) => { outputData += data.toString(); });
      cppProcess.stderr.on('data', (data) => { errorData += data.toString(); });

      cppProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('C++ Error:', errorData);
          return reject(new InternalServerErrorException('Algorithm engine failed'));
        }
        try {
          resolve(JSON.parse(outputData));
        } catch (e) {
          reject(new InternalServerErrorException('Invalid JSON from C++ engine'));
        }
      });
    });
  }
}