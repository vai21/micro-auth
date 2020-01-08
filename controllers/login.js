const User = require('../models/users')
const bcrypt = require('bcrypt')
const successMsg = require('../response').success
const errMsg = require('../response').err
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (email === '') {
      throw 'email must be filled'
    }

    if (password === '') {
      throw 'password must be filled'
    }
    
    const users = await User.findOne({
      where: {
        email: email
      }
    });
    let hash = users.dataValues.password
    
    let verifyPass = await bcrypt.compare(password, hash);

    if (verifyPass) {
      const newSession = uuid()
      await User.update({
        session: newSession
      }, {
        where: {
          email: email
        }
      })
      const token = jwt.sign({
        email: email,
        session: newSession
      }, process.env.SECRET)
      res.set('Authorization', token)
      return res.json(successMsg('successfully logged in')) 
    } else {
      throw 'wrong password'
    }
  } catch (err) {
    console.error(err)
    res.status(400).json(errMsg(err))
  }
}

module.exports = login