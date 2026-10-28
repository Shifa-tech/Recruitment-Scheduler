import { Entity,type Relation , PrimaryGeneratedColumn, Column , OneToMany } from 'typeorm';
import { Availability } from '../availability/availability.entity.js';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  roomNo: string; // e.g., "Room A", "Lab 1"

   @OneToMany(() => Availability, (availability) => availability.room)
  availabilities: Relation<Availability[]>;

}