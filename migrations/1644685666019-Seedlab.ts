import {MigrationInterface, QueryRunner} from "typeorm";

export class Seedlab1644685666019 implements MigrationInterface {

    labs = [
        {
          name: 'Spectrometer',
          description: 'Explore different spectrums',
          image: 'https://static1.bigstockphoto.com/1/9/2/large1500/291083350.jpg'
        },
        {
          name: 'Gamma radiation',
          description: 'Determine chemical composition',
          image: '/assets/lab_gamma.jpg'
        },
        {
          name: 'Resistance',
          description: 'Measure resistance and temperature relations',
          image: 'https://www.sciencenews.org/wp-content/uploads/2020/02/020620_ec_cold-hot_feat-1028x579.jpg'
        },
        {
          name: 'Temperature',
          description: 'Measure difference between heat camera and temperature sensor',
          image: '/assets/lab4.png'
        },
        {
          name: 'Spectrometer 2',
          description: 'Explore different spectrums',
          image: 'https://static1.bigstockphoto.com/1/9/2/large1500/291083350.jpg'
        },
        {
          name: 'Gamma radiation 2',
          description: 'Determine chemical composition',
          image: '/assets/lab_gamma.jpg'
        },
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
