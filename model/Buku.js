const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Buku = sequelize.define('Buku', {
    id_buku: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    judul: {
        type: DataTypes.INTEGER(100),
        allowNull: false
    },
    pengarang: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tahun_terbit: {
        type: DataTypes.DATE,
        allowNull: false
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'tbl_buku',
    timestamps: false,
})

module.exports = Buku