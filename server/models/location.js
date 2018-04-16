module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Location.associate = (models) => {
    // associations can be defined here
    Location.hasMany(models.Business, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE'
    });
  };
  return Location;
};
