import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { LabUser } from 'src/lab_users/lab_user.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'labs', timestamps: true })
export class Lab extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @Column({ field: 'name', type: DataType.STRING(100) })
    public name: string;

    @Column({ field: 'description', type: DataType.STRING(200) })
    public description: string;

    @Column({ field: 'image', type: DataType.STRING(2000) })
    public image: string;

    @Column({ field: 'is_disabled', type: DataType.BOOLEAN })
    public isDisabled: boolean;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;

    @BelongsToMany(() => User, () => LabUser)
    public users?: Array<User & {lab_user: LabUser}>;
}
