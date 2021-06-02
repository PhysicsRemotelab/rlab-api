'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Labs', 'is_disabled', {
          type: Sequelize.DataTypes.BOOLEAN
        })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Labs', 'is_disabled', { transaction: t })
      ]);
    });
  }
};