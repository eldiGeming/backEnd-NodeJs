const express = require('express')
const app = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// User registration
app.post('/register', async (req, res) => {
    try {
        const { nama, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ nama, username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

//User login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        
        // Compare the submitted password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            // If passwords match, generate a JWT token
            const payload = {
                id: user.id,
                nama: user.nama,
            };
            const secret = process.env.JWT_SECRET;
            const expiresIn = 60 * 60 * 1; // Token expiration time (1 hour)
        
            const token = jwt.sign({ payload }, secret, { expiresIn });
    
            return res.json({
                data: {
                    id: user.id,
                    nama: user.nama
                },
                token: token
            });
        }else{
            return res.status(401).json({ error: 'Authentication failed' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = app