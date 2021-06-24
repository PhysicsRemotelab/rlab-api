import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
export class MeasurementEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'lab_id' })
    public labId: number;

    @Column({ name: 'user_id' })
    public  userId: number;

    @Column({ length: 10000, nullable: false })
    public result: string;

    @Column({ length: 255, nullable: false })
    public name: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
}
