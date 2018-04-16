module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Category.associate = (models) => {
    // associations can be defined here
    Category.hasMany(models.Business, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
