import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lab } from 'src/labs/lab.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'lab_user', timestamps: false })
export class LabUser extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @ForeignKey(() => Lab)
    @Column({ field: 'lab_id', type: DataType.INTEGER })
    public labId: number;

    @ForeignKey(() => User)
    @Column({ field: 'user_id', type: DataType.INTEGER })
    public  userId: number;

    @Column({ field: 'taken_at' })
    public takenAt: Date;

    @Column({ field: 'taken_until' })
    public takenUntil: Date;
}
