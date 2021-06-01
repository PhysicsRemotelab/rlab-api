'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const takenAt = new Date();
    return queryInterface.bulkInsert('lab_user', [
      {
        lab_id: 1,
        user_id: 1,
        taken_at: takenAt,
        taken_until: new Date(takenAt.getTime() + 60*60000)
      },
      {
        lab_id: 2,
        user_id: 2,
        taken_at: takenAt,
        taken_until: new Date(takenAt.getTime() + 60*60000)
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lab_user', null, {});
  }
};
