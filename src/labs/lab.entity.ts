import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labs')
export class LabEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ name: 'code' })
    public code: string;

    @ApiProperty()
    @Column({ name: 'name' })
    public name: string;

    @ApiProperty()
    @Column({ name: 'description' })
    public description: string;

    @ApiProperty()
    @Column({ name: 'image' })
    public image: string;

    @ApiProperty()
    @Column({ name: 'is_disabled' })
    public isDisabled: boolean;

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
