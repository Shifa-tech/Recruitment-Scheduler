// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository , In } from 'typeorm';
// import { spawn } from 'child_process';
// import { User, Role } from '../user/user.entity.js';
// import { Availability } from '../availability/availability.entity.js';
// import * as path from 'path';

// @Injectable()
// export class SchedulingService {
//   constructor(
//     @InjectRepository(User)
//     private userRepo: Repository<User>,
//     @InjectRepository(Availability)
//     private availabilityRepo: Repository<Availability>,
//   ) {}

//   async findMatchesForCandidate(requiredSkill: string, round: string) {
//     // ---------------------------------------------------------
//     // 1. SKILL MATCH (Inside NestJS)
//     // ---------------------------------------------------------
//     // Find interviewers with the matching skill
//     const interviewers = await this.userRepo
//       .createQueryBuilder('user')
//       .where('user.role = :role', { role: Role.INTERVIEWER })
//       .andWhere('user.skills ILIKE :skill', { skill: `%${requiredSkill}%` })
//       .getMany();

//     if (interviewers.length === 0) {
//       return { success: false, error: 'NO_INTERVIEWER_WITH_SKILL' };
//     }

//     const interviewerIds = interviewers.map(i => i.id);


//     // 2. GET AVAILABILITY (Inside NestJS)
    
//     const availabilities = await this.availabilityRepo.find({
//       where: { interviewer: { id: In(interviewerIds) } },
//       relations: { interviewer: true },
//     });

//     // Format the data for C++
//     const cppInput = {
//       requiredSkill,
//       round,
//       interviewers: interviewers.map(int => ({
//         id: int.id,
//         name: int.name,
//         availability: availabilities
//           .filter(a => a.interviewer?.id === int.id)
//           .map(a => ({ start: a.startTime.toISOString(), end: a.endTime.toISOString() }))
//       }))
//     };

//     // 3. CALL C++ ENGINE

//     const cppOutput = await this.runCppAlgorithm(cppInput);

//     return cppOutput;
//   }

//   // Helper method to spawn the C++ binary and pass JSON
//   private runCppAlgorithm(inputJson: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       // Path to your compiled C++ executable
//       const exePath = path.resolve(process.cwd(), 'cpp_engine', 'scheduler.exe'); 
      
//       const cppProcess = spawn(exePath);

//       let outputData = '';
//       let errorData = '';

//       // Write JSON to C++ stdin
//       cppProcess.stdin.write(JSON.stringify(inputJson));
//       cppProcess.stdin.end();

//       // Read JSON from C++ stdout
//       cppProcess.stdout.on('data', (data) => {
//         outputData += data.toString();
//       });

//       // Catch C++ errors
//       cppProcess.stderr.on('data', (data) => {
//         errorData += data.toString();
//       });

//       cppProcess.on('close', (code) => {
//         if (code !== 0) {
//           console.error('C++ Error:', errorData);
//           return reject(new InternalServerErrorException('Algorithm engine failed'));
//         }
//         try {
//           resolve(JSON.parse(outputData));
//         } catch (e) {
//           reject(new InternalServerErrorException('Invalid JSON from C++ engine'));
//         }
//       });
//     });
//   }
// }