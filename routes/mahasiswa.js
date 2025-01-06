const express = require('express')
const app = express.Router()
const Mahasiswa = require('../model/Mahasiswa')
const verifyToken = require('../middleware/authMiddleware')

app.use(express.json()) // Middleware untuk parsing JSON

// Get All Data Mahasiswa
app.get('/', verifyToken, async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findAll()
        res.json(mahasiswa) // Kirim respons JSON
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Find One Data Mahasiswa
app.get('/:nim', verifyToken, async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findOne({ where: { nim: req.params.nim } })
        if (mahasiswa) {
            res.json(mahasiswa)
        } else {
            res.status(404).json({ message: 'Not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Post Data Mahasiswa
app.post('/', verifyToken, async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.create(req.body)
        res.status(201).json(mahasiswa)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Put Data Mahasiswa
app.put('/:nim', verifyToken, async (req, res) => {
    try {
        const [updated] = await Mahasiswa.update(req.body, { where: { nim: req.params.nim } })
        if (updated) {
            res.json({ message: 'Updated successfully!' })
        } else {
            res.status(404).json({ message: 'Not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Delete Data Mahasiswa
app.delete('/:nim', verifyToken, async (req, res) => {
    try {
        const deleted = await Mahasiswa.destroy({ where: { nim: req.params.nim } })
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