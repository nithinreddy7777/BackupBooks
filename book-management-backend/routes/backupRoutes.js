const express = require('express');
const router = express.Router();
const { backupDatabase, restoreDatabase } = require('../controllers/backupController');

// POST /api/backup
router.post('/backup', backupDatabase);

// POST /api/restore
router.post('/restore', restoreDatabase);

module.exports = router;
