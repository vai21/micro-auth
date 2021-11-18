const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');
const winston = require('../config/winston');

const User = require('../models/users');
const successMsg = require('../helpers/response').success;
const errMsg = require('../helpers/response').err;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email === 'undefined' || !email) {
      throw new Error('email must be filled');
    }

    if (password === '') {
      throw new Error('password must be filled');
    }

    const users = await User.findOne({
      where: {
        email,
      },
    });
    const hash = users.dataValues.password;

    const verifyPass = await bcrypt.compare(password, hash);

    if (verifyPass) {
      const newSession = uuid();
      await User.update({
        session: newSession,
      }, {
        where: {
          email,
        },
      });
      const token = jwt.sign({
        email,
        session: newSession,
      }, process.env.SECRET);
      res.set('Authorization', token);
      return res.json(successMsg('successfully logged in'));
    }
    throw new Error('wrong password');
  } catch (err) {
    winston.log('error', err);
    return res.status(400).json(errMsg(err));
  }
};

module.exports = login;
