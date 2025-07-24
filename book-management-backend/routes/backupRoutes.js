const express = require('express');
const router = express.Router();
const { backupDatabase, restoreDatabase } = require('../controllers/backupController');
router.post('/backup', backupDatabase);
router.post('/restore', restoreDatabase);
module.exports = router;
