const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  // attributes
  email: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  phone: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  province: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  relationship: {
    type: Sequelize.STRING
  },
  facebook: {
    type: Sequelize.STRING
  },
  twitter: {
    type: Sequelize.STRING
  },
  instagram: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  session: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

module.exports = User