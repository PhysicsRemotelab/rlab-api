import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Lab } from 'src/labs/lab.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'measurements', timestamps: true })
export class Measurement extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @ForeignKey(() => Lab)
    @Column({ field: 'lab_id', type: DataType.INTEGER })
    public labId: number;

    @ForeignKey(() => User)
    @Column({ field: 'user_id', type: DataType.INTEGER })
    public  userId: number;

    @Column({ field: 'result', type: DataType.STRING(10000) })
    public result: string;

    @Column({ field: 'name', type: DataType.STRING(256) })
    public name: string;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;

    @BelongsTo(() => User)
    public user: User;

    @BelongsTo(() => Lab)
    public lab: Lab;
}