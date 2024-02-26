'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {   
      await queryInterface.bulkInsert('Users', 
    [
      {
        email: 'John Doe',
        password:'123',
        username:'fake1',
      },
      {
        email: 'John Doe2',
        password:'123',
        username:'fake2',
      },
      {
        email: 'John Doe3',
        password:'123',
        username:'fake3',
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
