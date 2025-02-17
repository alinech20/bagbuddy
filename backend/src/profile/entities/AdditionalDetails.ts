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

@Entity({ schema: 'users', name: 'additional_details' })
@Unique(['profile_id'])
export class AdditionalDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_id: number;

  @OneToOne(() => Profile, (profile) => profile.additional_details)
  profile: Profile;

  @Column({ type: 'simple-array', nullable: true })
  travel_companions: string[];

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;
}
