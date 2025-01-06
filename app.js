const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Middleware untuk membaca JSON
app.use(cors({
    origin: 'http://localhost:3000', // Izinkan akses dari origin ini
  }));
  
app.use(express.json());

// Ambil port dari environment variable atau gunakan default 4000
const PORT = process.env.PORT || 4000;

// Panggil route Mahasiswa
const mahasiswaRoutes = require('./routes/mahasiswa');
app.use('/mahasiswa', mahasiswaRoutes);

const bukuRoutes = require('./routes/buku');
app.use('/buku', bukuRoutes);

const peminjamanRoutes = require('./routes/peminjaman');
app.use('/peminjaman', peminjamanRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Endpoint default
app.get('/', (req, res) => {
  res.send('Aplikasi berjalan dengan baik!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});