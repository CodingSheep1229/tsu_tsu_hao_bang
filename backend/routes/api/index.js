const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/schedule', require('./schedule'));
router.use('/todo', require('./todo'));

module.exports = router;