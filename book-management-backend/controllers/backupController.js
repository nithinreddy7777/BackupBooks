const fs = require('fs');
const path = require('path');
const Book = require('../models/Book'); 


const backupDatabase = async (req, res) => {
  try {
    const books = await Book.find();
    const backupPath = path.join(__dirname, '../backup/books.json');
    fs.writeFileSync(backupPath, JSON.stringify(books, null, 2));
    res.status(200).json({ message: 'Backup created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating backup', error });
  }
};


const restoreDatabase = async (req, res) => {
  try {
    const backupPath = path.join(__dirname, '../backup/books.json');
    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ message: 'Backup file not found' });
    }

    const data = fs.readFileSync(backupPath);
    const books = JSON.parse(data);
    await Book.deleteMany({});
    await Book.insertMany(books);

    res.status(200).json({ message: 'Database restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring database', error });
  }
};

module.exports = { backupDatabase, restoreDatabase };
