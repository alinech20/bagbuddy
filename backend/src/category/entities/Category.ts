import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'items', name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: string;

  @Column()
  parent_id: number;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  subcategories: Category[];
}
