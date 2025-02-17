import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  profile_id: number;

  @OneToOne(() => Profile, (profile) => profile.travel_personalization)
  profile: Profile;

  @Column({ type: 'simple-array', nullable: true })
  favorite_activities: string[];

  @Column({ nullable: true })
  weather_preference: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;
}
