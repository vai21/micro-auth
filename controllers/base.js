const successMsg = require('../helpers/response').success;
const errMsg = require('../helpers/response').err;

const getBase = async (req, res) => {
  try {
    const data = {
      value: 'Service is running!',
    };
    return res.json(successMsg(data));
  } catch (err) {
    return res.status(400).json(errMsg(err));
  }
};

module.exports = {
  getBase,
};
