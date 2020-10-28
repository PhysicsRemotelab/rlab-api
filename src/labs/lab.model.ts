import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'labs', timestamps: true })
export class Lab extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @Column({ field: 'name', type: DataType.STRING(100) })
    public name: string;

    @Column({ field: 'description', type: DataType.STRING(200) })
    public description: string;

    @Column({ field: 'image', type: DataType.STRING(200) })
    public image: string;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;
}