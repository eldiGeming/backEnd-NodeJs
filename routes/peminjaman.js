const express = require('express');
const app = express.Router();
const Peminjaman = require('../model/Peminjaman');
const Mahasiswa = require('../model/Mahasiswa');
const Buku = require('../model/Buku');
const sequelize = require('../config/database');
const verifyToken = require('../middleware/authMiddleware')


// Get Data Peminjaman beserta Mahasiswa dan Buku
app.get('/', verifyToken, async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findAll({
            include: [
                { model: Mahasiswa, as: 'mahasiswa' },
                { model: Buku, as: 'buku' }
            ]
        });
        console.log(peminjaman);
        res.json(peminjaman);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post Data Peminjaman
app.post('/', verifyToken, async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const peminjaman = await Peminjaman.create(req.body, { transaction: t });

        // Mengurangi stok buku
        const buku = await Buku.findOne({
            where: { id_buku: req.body.id_buku },
            transaction: t
        });

        if (!buku || buku.stok <= 0) {
            throw new Error("Stok buku tidak cukup");
        }

        buku.stok -= 1;
        await buku.save({ transaction: t });
        await t.commit();

        res.status(201).json(peminjaman);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
})

// Update Status Peminjaman
app.put('/:id', verifyToken, async (req, res) => {
    try {
        const tglKembali = new Date();
        const [updated] = await Peminjaman.update(
            { 
                status: 'Dikembalikan',
                tgl_kembali: tglKembali
            },
            { where: { id: req.params.id } }
        );

        if (updated) {
            res.json({ message: 'Status peminjaman berhasil diperbarui menjadi Dikembalikan!' });
        } else {
            res.status(404).json({ message: 'Peminjaman tidak ditemukan!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
