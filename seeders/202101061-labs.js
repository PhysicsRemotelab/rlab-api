'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labs', [
      {
        name: 'Spectrometer',
        description: 'Explore different spectrums',
        image: 'https://static1.bigstockphoto.com/1/9/2/large1500/291083350.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gamma radiation',
        description: 'Determine chemical composition',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ee0b7156-82bf-4b77-9372-bddd9552d8cc/d42e0f-5521a1f0-4293-45ce-9a0a-11057badadde.jpg/v1/fill/w_1024,h_768,q_75,strp/radiation_by_endoxos_d42e0f-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NjgiLCJwYXRoIjoiXC9mXC9lZTBiNzE1Ni04MmJmLTRiNzctOTM3Mi1iZGRkOTU1MmQ4Y2NcL2Q0MmUwZi01NTIxYTFmMC00MjkzLTQ1Y2UtOWEwYS0xMTA1N2JhZGFkZGUuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.vdtdwvwFk0kEesFFqohZ-HQ16N6MNvFRqPFryxDQF_c',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Resistance',
        description: 'Measure resistance and temperature relations',
        image: 'https://www.sciencenews.org/wp-content/uploads/2020/02/020620_ec_cold-hot_feat-1028x579.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Temperature',
        description: 'Measure difference between heat camera and temperature sensor',
        image: '/assets/lab4.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Spectrometer 2',
        description: 'Explore different spectrums',
        image: 'https://static1.bigstockphoto.com/1/9/2/large1500/291083350.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gamma radiation 2',
        description: 'Determine chemical composition',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ee0b7156-82bf-4b77-9372-bddd9552d8cc/d42e0f-5521a1f0-4293-45ce-9a0a-11057badadde.jpg/v1/fill/w_1024,h_768,q_75,strp/radiation_by_endoxos_d42e0f-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NjgiLCJwYXRoIjoiXC9mXC9lZTBiNzE1Ni04MmJmLTRiNzctOTM3Mi1iZGRkOTU1MmQ4Y2NcL2Q0MmUwZi01NTIxYTFmMC00MjkzLTQ1Y2UtOWEwYS0xMTA1N2JhZGFkZGUuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.vdtdwvwFk0kEesFFqohZ-HQ16N6MNvFRqPFryxDQF_c',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('labs', null, {});
  }
};
