const successMsg = require('../response').success
const errMsg = require('../response').err

const getHome = async (req, res) => {
  try {
    const data = {
      value: 'Hello World!'
    }
    return res.json(successMsg(data))
  } catch (err) {
    return res.status(400).json(errMsg(err))
  }
}

module.exports = {
  getHome
}