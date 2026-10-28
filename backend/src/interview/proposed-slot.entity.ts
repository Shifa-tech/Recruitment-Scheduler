import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { Interview } from './interview.entity.js';

@Entity('proposed_slots')
export class ProposedSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  // Link back to the Interview
  @ManyToOne(() => Interview, (interview) => interview.proposedSlots, { onDelete: 'CASCADE' })
  interview: Relation<Interview>;
}