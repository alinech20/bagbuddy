import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './List';
import { Item } from '../../item/entities/Item';

/**
 * Entity representing the association between lists and items.
 */
@Entity('lists_items', { schema: 'items' })
export class ListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => List, (list) => list.list_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: List;

  @ManyToOne(() => Item, (item) => item.list_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({ type: 'int' })
  priority_id: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  quantity_prepared: number;

  @Column({ type: 'int', default: 0 })
  quantity_to_buy: number;

  @Column({ type: 'boolean', default: false })
  packed: boolean;

  @Column({ type: 'boolean', default: false })
  prepared: boolean;

  @Column({ type: 'boolean', default: false })
  bought: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
