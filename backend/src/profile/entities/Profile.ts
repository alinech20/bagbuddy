import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './Status';
import { Country } from './Country';
import { TravelPreferences } from './TravelPreferences';
import { HealthSafety } from './HealthSafety';
import { TravelPersonalization } from './TravelPersonalization';
import { AdditionalDetails } from './AdditionalDetails';

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

  @Column({ nullable: true })
  gender: string;

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

  @OneToOne(() => TravelPreferences, (prefs) => prefs.profile)
  travel_preferences: TravelPreferences;

  @OneToOne(() => HealthSafety, (healthSafety) => healthSafety.profile)
  health_safety: HealthSafety;

  @OneToOne(() => TravelPersonalization, (pers) => pers.profile)
  travel_personalization: TravelPersonalization;

  @OneToOne(() => AdditionalDetails, (details) => details.profile)
  additional_details: AdditionalDetails;
}
