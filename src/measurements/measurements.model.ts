import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
export class Measurement extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'result' })
  public result: string;

  @Column({ name: 'lab_id' })
  public lab_id: number;

  @Column({ name: 'user_id' })
  public user_id: number;

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
