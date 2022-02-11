import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labs')
export class Lab extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'is_disabled' })
  public is_disabled?: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public updated_at: Date;
}
