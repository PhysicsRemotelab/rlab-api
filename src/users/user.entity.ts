import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'sub' })
    public sub: string;

    @Column({ name: 'nickname' })
    public nickname: string;

    @Column({ name: 'picture' })
    public picture: string;

    @Column({
        name: 'last_login',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public lastLogin: Date;

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
