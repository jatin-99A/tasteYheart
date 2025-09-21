const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../temp'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
module.exports = { upload };


