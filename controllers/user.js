const bcrypt = require('bcrypt');
const winston = require('winston');

const User = require('../models/users');

const successMsg = require('../helpers/response').success;
const errMsg = require('../helpers/response').err;

const getUser = async (req, res) => {
  try {
    res.json(successMsg(res.locals.user));
  } catch (err) {
    winston.log('error', err);
    res.status(400).json(errMsg(err));
  }
};

const updateUser = async (req, res) => {
  try {
    const updateObject = {
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
      instagram: req.body.twitter,
    };
    await User.update(updateObject, {
      where: {
        email: res.locals.user.email,
      },
    });
    res.json(successMsg('success updated profile'));
  } catch (err) {
    winston.log('error', err);
    res.status(400).json(errMsg(err));
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const userData = await User.findOne({
      where: {
        email: res.locals.user.email,
      },
    });
    const hash = userData.dataValues.password;
    const verifyPass = await bcrypt.compare(password, hash);

    if (verifyPass) {
      const newHash = await bcrypt.hash(newPassword, 10);

      await User.update({
        password: newHash,
      }, {
        where: {
          email: res.locals.user.email,
        },
      });
    } else {
      throw new Error('wrong password');
    }
    return res.json(successMsg('success changing password'));
  } catch (err) {
    winston.log('error', err);
    return res.status(400).json(errMsg(err));
  }
};

module.exports = {
  getUser,
  updateUser,
  changePassword,
};
