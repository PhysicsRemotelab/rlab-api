import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'lab_id' })
    public lab_id: number;

    @Column({ name: 'user_id' })
    public user_id: number;

    @Column({ name: 'is_cancelled' })
    public is_cancelled: boolean;

    @Column({
        name: 'taken_from',
        type: 'timestamp'
    })
    public taken_from: Date;

    @Column({
        name: 'taken_until',
        type: 'timestamp'
    })
    public taken_until: Date;

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
