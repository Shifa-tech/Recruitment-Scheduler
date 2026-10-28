import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './user.entity.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async syncUser(firebaseUid: string, email: string, name: string) {
    // 1. Check if user exists in Postgres
    let user = await this.userRepository.findOne({ where: { firebaseUid } });

    // 2. If not, create them
    if (!user) {
      user = this.userRepository.create({
        firebaseUid,
        email,
        name,
        role: Role.CANDIDATE, // Default role
      });
      await this.userRepository.save(user);
    }

    return user;
  }
   async findByFirebaseUid(firebaseUid: string) {
    return this.userRepository.findOne({ where: { firebaseUid } });
  }

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

}