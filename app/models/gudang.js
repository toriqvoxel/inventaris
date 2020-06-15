'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gudang = sequelize.define('Gudang', {
    nama_gudang: {
      type: DataTypes.STRING
    },
    kode_gudang: {
      type: DataTypes.STRING,
      unique: {
	     args: true,
	     msg: 'Kode gudang already in use!',
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
    alamat: {
      type: DataTypes.STRING
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
        fields: ['kode_gudang']
      }
    ],
    tableName: 'gudang'
  });
  Gudang.associate = function(models) {
    // associations can be defined here
    Gudang.belongsToMany(models.Barang, {
      through: models.Inventaris,
      as: 'inventaris_gudang',
      foreignKey: 'gudang_id'
    });
    Gudang.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Gudang;
};