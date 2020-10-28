import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lab } from 'src/labs/lab.model';

@Table({ tableName: 'measurements', timestamps: true })
export class Measurement extends Model {

    @Column({ field: 'id', primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id: number;

    @ForeignKey(() => Lab)
    @Column({ field: 'lab_id', type: DataType.INTEGER })
    public labId: number;

    @Column({ field: 'result', type: DataType.STRING(1000) })
    public result: string;

    @Column({ field: 'email', type: DataType.STRING(200) })
    public email: string;

    @Column({ field: 'created_at' })
    public createdAt: Date;

    @Column({ field: 'updated_at' })
    public updatedAt: Date;
}