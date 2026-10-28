import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,type Relation} from 'typeorm';
import { User } from '../user/user.entity.js';
import { Room } from '../room/room.entity.js'

@Entity('availabilities')
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  // This links the availability block to the specific interviewer
  @ManyToOne(() => User, (user) => user.availabilities, { onDelete: 'CASCADE' ,nullable:true })
  interviewer: Relation<User> | null;

  @ManyToOne(() => Room, (room) => room.availabilities, { onDelete: 'CASCADE', nullable: true })
  room: Relation<Room> | null;

}