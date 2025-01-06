const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const secret = process.env.JWT_SECRET;

    if (!authHeader) return res.status(401).json({ error: 'Access denied' });

    const token = authHeader.split(' ')[1]; // Ambil token setelah "Bearer"
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken