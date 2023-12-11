const multer = require('multer');
const imagekit = require('../config/imagekitConfig');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

module.exports = upload;

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, Date.now() + '-' + fileName);
//     }
// });
  
// const upload = multer({
//     storage: storage, limits: { fileSize: 3000000 } // 3MB limit
// });

// module.exports = upload;