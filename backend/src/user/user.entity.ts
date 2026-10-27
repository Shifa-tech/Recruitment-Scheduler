import { Entity, PrimaryGeneratedColumn, Column ,OneToMany } from 'typeorm';
import { Availability } from '../availability/availability.entity.js';

export enum Role {
  CANDIDATE = 'CANDIDATE',
  INTERVIEWER = 'INTERVIEWER',
  COORDINATOR = 'COORDINATOR',
}

@Entity('users') // This tells TypeORM to create a table named "users"
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  firebaseUid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CANDIDATE,
  })
  role: Role;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Availability, (availability) => availability.interviewer)
  availabilities: Availability[];

}