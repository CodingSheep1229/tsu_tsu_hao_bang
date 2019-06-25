const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/schedule', require('./schedule'));
router.use('/todo', require('./todo'));
router.use('/vote',require('./vote'));

module.exports = router;