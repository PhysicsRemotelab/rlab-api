import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labs')
export class LabEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column() 
    @Generated('uuid') 
    public uuid: string;

    @Column({ length: 255, nullable: false })
    public name: string;

    @Column({ length: 255, nullable: true })
    public description: string;

    @Column({ length: 255, nullable: true })
    public image: string;

    @Column({ name: 'is_disabled', type: 'boolean', default: false })
    public isDisabled: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
}
