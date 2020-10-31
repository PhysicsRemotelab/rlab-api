import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lab } from 'src/labs/lab.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'history', timestamps: true })
export class History extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @ForeignKey(() => User)
    @Column({ field: 'user_id', type: DataType.INTEGER })
    public userId: number;

    @ForeignKey(() => Lab)
    @Column({ field: 'lab_id', type: DataType.INTEGER })
    public labId: number;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;
}