import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @Column({ field: 'name', type: DataType.STRING(200) })
    public name: string;

    @Column({ field: 'email', type: DataType.STRING(200) })
    public email: string;

    @Column({ field: 'nickname', type: DataType.STRING(200) })
    public nickname: string;

    @Column({ field: 'gravatar', type: DataType.STRING(200) })
    public gravatar: string;

    @Column({ field: 'last_login' })
    public lastLogin: Date;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;
}