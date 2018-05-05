module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    mobile: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    url: DataTypes.STRING
  }, {});
  Business.associate = (models) => {
    // associations can be defined here
    Business.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.Location, {
      foreignKey: 'LocationId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};