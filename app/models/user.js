'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nama: {
      type: DataTypes.STRING,
      required: true
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        args: true,
        msg: 'Username already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ], 
    tableName: 'user'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};