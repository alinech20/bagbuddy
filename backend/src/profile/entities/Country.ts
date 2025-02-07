import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'users', name: 'countries' })
@Unique(['name'])
@Unique(['iso_code_2'])
@Unique(['iso_code_3'])
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 2 })
  iso_code_2: string;

  @Column({ type: 'varchar', length: 3 })
  iso_code_3: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;
}
