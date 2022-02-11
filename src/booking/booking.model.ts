import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'lab_id' })
  public lab_id: number;

  @Column({ name: 'user_id' })
  public user_id: number;

  @Column({ name: 'is_cancelled' })
  public is_cancelled: boolean;

  @Column({
    name: 'taken_at',
    type: 'timestamp'
  })
  public taken_at: Date;

  @Column({
    name: 'taken_until',
    type: 'timestamp'
  })
  public taken_until: Date;
}
