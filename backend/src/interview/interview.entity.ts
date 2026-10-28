import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../user/user.entity.js';
import { Room } from '../room/room.entity.js';
import { Result } from './result.entity.js';

export enum InterviewRound {
  CODING = 'CODING',
  TECH = 'TECH',
  HR = 'HR',
}

export enum InterviewStatus {
  OPTIONS_OFFERED = 'OPTIONS_OFFERED',
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: InterviewRound })
  round: InterviewRound;

  @Column({ type: 'enum', enum: InterviewStatus, default: InterviewStatus.OPTIONS_OFFERED })
  status: InterviewStatus;

  // Start and End are nullable because initially, it's just "Options Offered"
  @Column({ type: 'timestamp', nullable: true })
  startTime: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  // --- Relationships ---

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  candidate: Relation<User>;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  interviewer: Relation<User>;

  @ManyToOne(() => Room, { nullable: true, onDelete: 'SET NULL' })
  room: Relation<Room> | null;

  @OneToOne(() => Result, (result) => result.interview, { nullable: true })
  result: Relation<Result> | null;
}