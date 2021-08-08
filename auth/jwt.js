
const jwt = require("jsonwebtoken")
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '10000s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.cookie
    const token = authHeader.split('=')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403)
        req.token_data=data
        next()
    })

}

module.exports = { generateAccessToken, authenticateToken };
