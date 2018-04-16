module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetpwd: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('client', 'admin'),
      defaultValue: 'client'
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Business, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Review, { foreignKey: 'UserId', onDelete: 'CASCADE' });
  };
  return User;
};