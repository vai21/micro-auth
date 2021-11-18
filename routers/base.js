const express = require('express');

const router = express.Router();
const { getBase } = require('../controllers/base');

router.get('/', getBase);

module.exports = router;
