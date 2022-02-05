import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany
} from 'sequelize-typescript';
import { Lab } from 'src/labs/lab.model';
import { LabUser } from 'src/lab_users/lab_user.model';
import { Role } from 'src/roles/role.model';
import { UserRole } from 'src/user_roles/user_role.model';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  public id: number;

  @Column({ field: 'name', type: DataType.STRING(255) })
  public name: string;

  @Column({ field: 'email', type: DataType.STRING(255) })
  public email: string;

  @Column({ field: 'sub', type: DataType.STRING(255) })
  public sub: string;

  @Column({ field: 'nickname', type: DataType.STRING(255) })
  public nickname: string;

  @Column({ field: 'picture', type: DataType.STRING(255) })
  public picture: string;

  @Column({ field: 'last_login' })
  public lastLogin: Date;

  @Column({ field: 'created_at' })
  public createdAt: Date;

  @Column({ field: 'updated_at' })
  public updatedAt: Date;

  @BelongsToMany(() => Lab, () => LabUser)
  public labs?: Array<Lab & { lab_user: LabUser }>;

  @BelongsToMany(() => Role, () => UserRole)
  public roles?: Array<Role & { user_role: UserRole }>;
}
