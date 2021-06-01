import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/role.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'user_role', timestamps: false })
export class UserRole extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @ForeignKey(() => Role)
    @Column({ field: 'role_id', type: DataType.INTEGER })
    public roleId: number;

    @ForeignKey(() => User)
    @Column({ field: 'user_id', type: DataType.INTEGER })
    public  userId: number;
}
