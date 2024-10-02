const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'src/public/uploads/images/avatar/';
        cb(null, dir); // Thư mục lưu trữ file
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        const normalizedPath = path.normalize(filename);
        cb(null, normalizedPath); // Đặt tên file với đường dẫn chuẩn hóa
    },
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Giới hạn kích thước file 5MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
