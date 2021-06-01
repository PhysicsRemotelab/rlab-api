'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('measurements', [
      {
        lab_id: 1,
        user_id: 1,
        result: '1,2,3,4,5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lab_id: 2,
        user_id: 1,
        result: '1,2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lab_id: 3,
        user_id: 2,
        result: '1,2,3,4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lab_id: 4,
        user_id: 2,
        result: '1,2,3,4,5,6',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('measurements', null, {});
  }
};