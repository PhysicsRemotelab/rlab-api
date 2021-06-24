import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 255, nullable: false })
    public name: string;

    @Column({ length: 255, nullable: false })
    public email: string;

    @Column({ length: 255, nullable: false })
    public sub: string;

    @Column({ length: 255, nullable: false })
    public nickname: string;

    @Column({ length: 255, nullable: false })
    public picture: string;

    @Column({ name: 'last_login', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public lastLogin: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
}
