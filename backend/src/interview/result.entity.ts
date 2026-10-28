import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Interview } from "./interview.entity.js";

export enum ResultOutcome {
  PASS = 'PASS',
  FAIL = 'FAIL',
}

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  score: number;

  @Column({ type: 'enum', enum: ResultOutcome })
  outcome: ResultOutcome;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  // Used for the "Live Evaluation Rubric" (blinded feedback)
  @Column({ default: true })
  blinded: boolean;

  // 1-to-1 relationship with Interview
  @OneToOne(() => Interview, (interview) => interview.result, { onDelete: 'CASCADE' })
  @JoinColumn() //  This makes Result the "owner" of the relationship (holds the FK)
  interview: Relation<Interview>;
}