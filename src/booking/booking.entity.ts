import { ApiProperty } from '@nestjs/swagger';
import { LabEntity } from '../labs/lab.entity';
import { UserEntity } from '../users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ name: 'token' })
    public token: string;

    @ApiProperty()
    @Column({ name: 'lab_id' })
    public labId: number;

    @ManyToOne(() => LabEntity, (lab) => lab.bookings, { eager: true })
    public lab: LabEntity;

    @ApiProperty()
    @Column({ name: 'user_id' })
    public userId: number;

    @ManyToOne(() => UserEntity, { eager: true })
    public user: UserEntity;

    @ApiProperty()
    @Column({ name: 'is_cancelled' })
    public isCancelled: boolean;

    @ApiProperty()
    @Column({
        name: 'taken_from',
        type: 'timestamp'
    })
    public takenFrom: Date;

    @ApiProperty()
    @Column({
        name: 'taken_until',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public takenUntil: Date;

    @ApiProperty()
    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public createdAt: Date;

    @ApiProperty()
    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public updatedAt: Date;
}
