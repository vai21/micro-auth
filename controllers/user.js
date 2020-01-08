const User = require('../models/users')
const bcrypt = require('bcrypt')
const successMsg = require('../response').success
const errMsg = require('../response').err

const getUser = async (req, res) => {
  try {
    res.json(successMsg(res.locals.user))
  } catch (err) {
    console.error(err)
    res.status(400).json(errMsg(err))
  }
}

const updateUser = async (req, res) => {
  try {
    let updateObject = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      phone: req.body.phone,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      relationship: req.body.relationship,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.twitter
    }
    const update = await User.update(updateObject, {
      where: {
        email: res.locals.user.email
      }
    })
    res.json(successMsg('success updated profile'))
  } catch (err) {
    console.error(err)
    res.status(400).json(errMsg(err))
  }
}

const changePassword = async (req, res) => {
  try {
    const password = req.body.password
    const newPassword = req.body.newPassword

    const userData = await User.findOne({
      where: {
        email: res.locals.user.email
      }
    });
    let hash = userData.dataValues.password

    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');

    let verifyPass = await bcrypt.compare(password, hash);

    if (verifyPass) {
      let newHash = await bcrypt.hash(newPassword, 10)
      newHash = newHash.replace(/^\$2y(.+)$/i, '$2a$1');
      await User.update({
        password: newHash
    }, {
        where: {
          email: res.locals.user.email
        }
      })
    } else {
      throw 'wrong password'
    }
    res.json(successMsg('success changing password'))
  } catch (err) {
    console.error(err)
    res.status(400).json(errMsg(err))
  }
}

module.exports = {
  getUser,
  updateUser,
  changePassword
}