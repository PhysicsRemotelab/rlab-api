'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_role', [
      {
        role_id: 1,
        user_id: 1
      },
      {
        role_id: 2,
        user_id: 2
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role', null, {});
  }
};
