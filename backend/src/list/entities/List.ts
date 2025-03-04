import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/Profile';

@Entity({ schema: 'items', name: 'lists' })
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_id: number;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  owner: Profile;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 16, default: 'Active' })
  status: string;

  @Column({ default: false })
  is_template: boolean;

  @Column({ nullable: true })
  template_id: number;

  @ManyToOne(() => List, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'template_id' })
  template: List;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
