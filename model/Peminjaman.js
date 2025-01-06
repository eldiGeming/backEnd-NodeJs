const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Mahasiswa = require('./Mahasiswa');
const Buku = require('./Buku');

const Peminjaman = sequelize.define('Peminjaman', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nim: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: { //membuat relasi dengan model Mahasiswa
            model: Mahasiswa,
            key: 'nim'
        }
    },
    id_buku: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { //membuat relasi dengan model Buku
            model: Buku,
            key: 'id_buku'
        }
    },
    tgl_pinjam: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tgl_kembali: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: 'Dipinjam'
    },
}, {
    tableName: 'tbl_peminjaman',
    timestamps: false,
});

Peminjaman.belongsTo(Mahasiswa, { foreignKey: 'nim', targetKey: 'nim', as: 'mahasiswa' });
Peminjaman.belongsTo(Buku, { foreignKey: 'id_buku', as: 'buku' });

module.exports = Peminjaman;
