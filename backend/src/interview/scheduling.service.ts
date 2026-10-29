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
    // Change the signature to accept an array
  async findMatchesForCandidate(requiredSkills: string[], round: string) {
    const interviewers = await this.userService.findAllInterviewers();

    if (interviewers.length === 0) {
      return { success: false, error: 'NO_INTERVIEWERS_IN_SYSTEM' };
    }

    const interviewerIds = interviewers.map(i => i.id);

    const availabilities = await this.availabilityRepo.find({
      where: { interviewer: { id: In(interviewerIds) } },
      relations: { interviewer: true },
    });

    const cppInput = {
      requiredSkills, //  Now an array
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

    return await this.runCppAlgorithm(cppInput);
  }

    private runCppAlgorithm(inputJson: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const exePath = path.resolve(process.cwd(), 'cpp_engine', 'scheduler.exe'); 
        const cppProcess = spawn(exePath);

        let outputData = '';
        let errorData = '';

        cppProcess.stdin.write(JSON.stringify(inputJson));
        cppProcess.stdin.end();

        cppProcess.stdout.on('data', (data) => { outputData += data.toString(); });
        cppProcess.stderr.on('data', (data) => { errorData += data.toString(); });

        cppProcess.on('close', (code) => {
          if (code !== 0) {
            console.error('C++ Process Error Output:', errorData);
            // Instead of rejecting, return a safe JSON error
            return resolve({ success: false, error: 'CPP_ENGINE_FAILED' });
          }
          try {
            resolve(JSON.parse(outputData));
          } catch (e) {
            console.error('Failed to parse C++ output:', outputData);
            resolve({ success: false, error: 'INVALID_CPP_OUTPUT' });
          }
        });
      } catch (err) {
        console.error('Failed to spawn C++ process:', err);
        resolve({ success: false, error: 'SPAWN_FAILED' });
      }
    });
  }
}