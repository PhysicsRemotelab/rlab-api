'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@remotelab.ee',
        sub: 'auth0|5f9871f378f4b000768634fe',
        nickname: 'admin',
        picture: 'https://vignette.wikia.nocookie.net/fan-fiction-library/images/1/15/Admin.png/revision/latest?cb=20140917130743',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'student',
        email: 'student@remotelab.ee',
        sub: 'auth0|5f9871f378f4b000768634fe',
        nickname: 'student',
        picture: 'https://vignette.wikia.nocookie.net/fan-fiction-library/images/1/15/Admin.png/revision/latest?cb=20140917130743',
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
