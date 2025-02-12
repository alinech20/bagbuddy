import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './Status';
import { Gender } from './Gender';
import { Country } from './Country';

@Entity({ schema: 'users', name: 'profiles' })
@Unique(['email'])
@Unique(['uid'])
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @ManyToOne(() => Gender, { nullable: true })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ default: false, nullable: false })
  onboarded: boolean;

  @Column({ default: 1, nullable: false })
  status_id: number;

  @ManyToOne(() => Status, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;
}
