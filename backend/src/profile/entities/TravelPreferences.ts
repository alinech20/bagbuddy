import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity({ schema: 'users', name: 'travel_preferences' })
@Unique(['profile_id'])
export class TravelPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_id: number;

  @OneToOne(() => Profile, (profile) => profile.travel_preferences)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column({ nullable: true })
  frequency: string;

  @Column({ type: 'simple-array', nullable: true })
  purpose: string[];

  @Column({ type: 'simple-array', nullable: true })
  destinations: string[];

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;
}
