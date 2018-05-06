module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
