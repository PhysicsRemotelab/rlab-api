import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit')
export class Audit extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'action' })
    public action: string;

    @Column({ name: 'user_id' })
    public user_id: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public created_at: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public updated_at: Date;
}
