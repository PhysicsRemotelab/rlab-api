import { LabEntity } from 'src/labs/lab.entity';
import { UserEntity } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
export class MeasurementEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'result' })
    public result: string;

    @Column({ name: 'lab_id' })
    public labId: number;

    @ManyToOne(() => LabEntity, { eager: true })
    @JoinColumn({ name: 'lab_id' })
    public lab: LabEntity;

    @Column({ name: 'user_id' })
    public userId: number;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public updatedAt: Date;
}
