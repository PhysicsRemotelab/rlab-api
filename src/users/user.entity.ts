import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ name: 'code', nullable: true })
    public code?: string;

    @ApiProperty()
    @Column({ name: 'email' })
    public email: string;

    @ApiProperty()
    @Column({ name: 'sub' })
    public sub: string;

    @ApiProperty()
    @Column({ name: 'first_name', nullable: true })
    public firstName?: string;

    @ApiProperty()
    @Column({ name: 'last_name', nullable: true })
    public lastName?: string;

    @ApiProperty()
    @Column({ name: 'nickname' })
    public nickname: string;

    @ApiProperty()
    @Column({ name: 'picture' })
    public picture: string;

    @ApiProperty()
    @Column({
        name: 'last_login',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public lastLogin: Date;

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
