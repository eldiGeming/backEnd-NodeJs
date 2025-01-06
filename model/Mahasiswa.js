const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mahasiswa = sequelize.define('Mahasiswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nim: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    kelas: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: 'tbl_mahasiswa',
    timestamps: false,
})

module.exports = Mahasiswa