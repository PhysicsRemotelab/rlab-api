import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { UserRole } from 'src/user_roles/user_role.model';

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  public id: number;

  @Column({ field: 'name', type: DataType.STRING(200) })
  public name: string;

  @Column({ field: 'created_at' })
  public createdAt: Date;

  @Column({ field: 'updated_at' })
  public updatedAt: Date;

  @BelongsToMany(() => User, () => UserRole)
  public users?: Array<User & { user_role: UserRole }>;
}
