'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventaris = sequelize.define('Inventaris', {
    barang_id: {
      type: DataTypes.INTEGER,
      field: 'barang_id'
    },
    gudang_id: {
      type: DataTypes.INTEGER,
      field: 'gudang_id'
    },
    stok: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      field: 'user_id'
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
    tableName: 'inventaris'
  });
  Inventaris.associate = function(models) {
    // associations can be defined here
    Inventaris.belongsTo(models.Barang, {
      foreignKey: 'barang_id'
    });
    Inventaris.belongsTo(models.Gudang, {
      foreignKey: 'gudang_id'
    });
    Inventaris.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Inventaris;
};