import { MigrationInterface, QueryRunner } from "typeorm";

export class LabSeeder1644685666019 implements MigrationInterface {
    labs = [
        {
          id: 1,
          name: 'Efficiency of light-emitting diode',
          description: 'Determine of efficiency of diode',
          image: '/assets/lab1.jpg'
        },
        {
          id: 2,
          name: 'Light spectrum of lamp',
          description: 'Explore spectrums of lamps',
          image: '/assets/lab2.jpg'
        },
        {
          id: 3,
          name: 'Gamma spectroscopy',
          description: 'Determine sample material composition using gamma radiation',
          image: '/assets/lab3.jpg'
        },
        {
          id: 4,
          name: 'X-Ray Fluorescence spectroscopy',
          description: 'Determine sample material composition using fluoroscence',
          image: '/assets/lab4.jpg'
        },
        {
          id: 5,
          name: 'Effect of temperature on resistance',
          description: 'Explore relationship between resistance and temperature',
          image: '/assets/lab5.jpg'
        },
        {
          id: 6,
          name: 'Diffraction of light',
          description: 'Explore diffraction of light using different slits',
          image: '/assets/lab6.jpg'
        }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < this.labs.length; i++) {
            const query = `INSERT INTO labs (name, description, image, is_disabled) VALUES ('${this.labs[i].name}', '${this.labs[i].description}', '${this.labs[i].image} ', 0)`;
            await queryRunner.query(query);
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
