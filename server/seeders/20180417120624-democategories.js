module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Sports',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Marketing',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Banking',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Entertainment',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Government',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Law',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'IT',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Education',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Health',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
