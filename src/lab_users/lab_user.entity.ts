import { LabEntity } from 'src/labs/lab.entity';
import UserEntity from 'src/users/user.entity';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lab_user')
export class LabUserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany(type => LabEntity)
    @Column({ name: 'lab_id' })
    public labId: number;

    @ManyToMany(type => UserEntity)
    @Column({ name: 'user_id' })
    public  userId: number;

    @Column({ name: 'taken_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public takenAt: Date;

    @Column({ name: 'taken_until', type: 'timestamp' })
    public takenUntil: Date;
}
