const User = require('../models/users')
const errMsg = require('../response').err
const jwt = require('jsonwebtoken')

const verifyAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const verify = jwt.verify(auth, process.env.SECRET)
    const userData = await User.findOne({
      where: {
        email: verify.email,
        session: verify.session
      },
      attributes: { exclude: ['password'] }
    })
    if(userData) {
      res.locals.user = userData
    } else {
      throw 'not found'
    }
    next()
  } catch (err) {
    return res.status(401).json(errMsg('Unauthorized'))
  }
}

module.exports = verifyAuth