'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@remotelab.ee',
        nickname: 'admin',
        gravatar: 'https://vignette.wikia.nocookie.net/fan-fiction-library/images/1/15/Admin.png/revision/latest?cb=20140917130743',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'student',
        email: 'student@remotelab.ee',
        nickname: 'student',
        gravatar: 'https://vignette.wikia.nocookie.net/fan-fiction-library/images/1/15/Admin.png/revision/latest?cb=20140917130743',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
