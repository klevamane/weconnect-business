module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Locations', [{
      name: 'Abia',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lagos',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bayelsa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rivers',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Imo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Enugu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Abjua',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Adamawa',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Locations', null, {});
  }
};
