const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../backups');
const RETENTION_DAYS = 7;

function cleanupOldBackups() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('Backup directory not found.');
    return;
  }

  const files = fs.readdirSync(BACKUP_DIR);
  const now = Date.now();

  files.forEach(file => {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    const ageInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

    if (ageInDays > RETENTION_DAYS) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old backup: ${file}`);
    }
  });
}

cleanupOldBackups();
