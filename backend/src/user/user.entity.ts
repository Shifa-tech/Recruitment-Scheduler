import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  CANDIDATE = 'CANDIDATE',
  INTERVIEWER = 'INTERVIEWER',
  COORDINATOR = 'COORDINATOR',
}

@Entity('users') // This tells TypeORM to create a table named "users"
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

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

}