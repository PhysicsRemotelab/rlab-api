import { ApiProperty } from '@nestjs/swagger';
import { LabEntity } from '../labs/lab.entity';
import { UserEntity } from '../users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
export class MeasurementEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ name: 'result' })
    public result: string;

    @ApiProperty()
    @Column({ name: 'file_name' })
    public fileName: string;

    @ApiProperty()
    @Column({ name: 'display_name' })
    public displayName: string;

    @ApiProperty()
    @Column({ name: 'lab_id' })
    public labId: number;

    @ManyToOne(() => LabEntity, { eager: true })
    public lab: LabEntity;

    @ApiProperty()
    @Column({ name: 'user_id' })
    public userId: number;

    @ManyToOne(() => UserEntity, { eager: true })
    public user: UserEntity;

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
