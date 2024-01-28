const jwt = require('jsonwebtoken')
const db = require('../api/models')
const User = db.users
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const genarateAccessToken = (loggedUser) => {
  return jwt.sign(loggedUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '300',
  })
}

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body.token
  let id = req.body.uId
  let accessToken = ''
  let refreshTokens = ''
  User.findOne({
    where: { uId: id },
  })
    .then((data) => {
      if (data == null) return res.sendStatus(403)
      refreshTokens = data.refreshToken
      if (refreshToken == null) return res.sendStatus(401)
      if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, loggedUser) => {
          if (err) return res.sendStatus(403)
          accessToken = genarateAccessToken({ name: loggedUser.name })
        }
      )
      res.json({ accessToken: accessToken })
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}

module.exports = { authenticateToken, genarateAccessToken, refreshAccessToken }
