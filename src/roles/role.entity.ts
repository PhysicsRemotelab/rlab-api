import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column() 
    @Generated('uuid') 
    public uuid: string;

    @Column()
    public name: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
}
