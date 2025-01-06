const express = require('express')
const app = express.Router()
const Buku = require('../model/Buku')
const verifyToken = require('../middleware/authMiddleware')


app.use(express.json()) // Middleware untuk parsing JSON

// Get All Data Buku
app.get('/', verifyToken, async (req, res) => {
    try {
        const buku = await Buku.findAll()
        res.json(buku) // Kirim respons JSON
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Find One Data Buku
app.get('/:id_buku', verifyToken, async (req, res) => {
    try {
        const buku = await Buku.findOne({ where: { id_buku: req.params.id_buku } })
        if (buku) {
            res.json(buku)
        } else {
            res.status(404).json({ message: 'Not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Post Data Buku
app.post('/', verifyToken, async (req, res) => {
    try {
        const buku = await Buku.create(req.body)
        res.status(201).json(buku)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Put Data Buku
app.put('/:id_buku', verifyToken, async (req, res) => {
    try {
        const [updated] = await Buku.update(req.body, { where: { id_buku: req.params.id_buku } })
        if (updated) {
            res.json({ message: 'Updated successfully!' })
        } else {
            res.status(404).json({ message: 'Not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Delete Data Buku
app.delete('/:id_buku', verifyToken, async (req, res) => {
    try {
        const deleted = await Buku.destroy({ where: { id_buku: req.params.id_buku } })
        if (deleted) {
            res.json({ message: 'Deleted successfully!' })
        } else {
            res.status(404).json({ message: 'Not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = app