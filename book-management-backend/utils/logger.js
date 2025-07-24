const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, 'backup.log');

exports.info = (msg) => {
  fs.appendFileSync(logFile, `[INFO] ${new Date().toISOString()} - ${msg}\n`);
};

exports.error = (msg) => {
  fs.appendFileSync(logFile, `[ERROR] ${new Date().toISOString()} - ${msg}\n`);
};
