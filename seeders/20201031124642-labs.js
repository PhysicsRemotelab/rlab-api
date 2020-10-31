'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labs', [
      {
        name: 'Spectrometer',
        user_id: null,
        description: 'Explore different spectrums',
        image: 'https://icatcare.org/app/uploads/2018/07/Helping-your-new-cat-or-kitten-settle-in-1.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gamma radiation',
        user_id: null,
        description: 'Determine chemical composition',
        image: 'https://i.ytimg.com/vi/SB-qEYVdvXA/hqdefault.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('labs', null, {});
  }
};
