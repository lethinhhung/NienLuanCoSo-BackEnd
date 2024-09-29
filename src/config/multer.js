const multer = require('multer');

const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ
const upload = multer({ storage: storage });

module.exports = upload;
