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

@Entity({ schema: 'users', name: 'travel_personalization' })
@Unique(['profile_id'])
export class TravelPersonalization {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile, (profile) => profile.travel_personalization)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column({ nullable: true })
  favorite_activities: string[];

  @Column({ nullable: true })
  weather_preference: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;
}
