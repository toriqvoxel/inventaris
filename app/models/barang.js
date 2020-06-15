'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    nama_barang: {
      type: DataTypes.STRING,
      required: true
    },
    kode_barang: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Kode barang already in use!'
      },
      defaultValue: function() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 5; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return result;
      }
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
    indexes: [
      {
        unique: true,
        fields: ['kode_barang']
      }
    ],
    tableName: 'barang'
  });
  Barang.associate = function (models) {
    // associations can be defined here
    Barang.belongsToMany(models.Gudang, {
      through: models.Inventaris,
      as: 'inventaris_gudang',
      foreignKey: 'barang_id'
    });
    Barang.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Barang;
};