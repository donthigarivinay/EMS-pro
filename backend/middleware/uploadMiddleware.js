const multer = require('multer');
const path = require('path');

// Ensure uploads folder exists or let multer handle it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fs = require('fs')
    const dir = './uploads'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Generate a unique file name
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = upload;
