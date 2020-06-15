'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    barang_id: {
      type: DataTypes.INTEGER,
      field: 'barang_id'
    },
    gudang_id: {
      type: DataTypes.INTEGER,
      field: 'gudang_id'
    },
    jumlah: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    jenis: {
      type: DataTypes.ENUM({values: ['masuk', 'keluar']})
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
    tableName: 'log'
  });
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.Barang, {
      foreignKey: 'barang_id'
    });
    Log.belongsTo(models.Gudang, {
      foreignKey: 'gudang_id'
    });
    Log.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Log;
};