const multer = require('multer');

// Configure storage
const storage = multer.memoryStorage(); // Store the image in memory as a Buffer

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;