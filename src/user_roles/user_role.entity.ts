import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role')
export class UserRoleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'role_id' })
    public roleId: number;

    @Column({ name: 'user_id' })
    public  userId: number;
}
