const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file) {
      cb(null, "uploads");
    } else {
      cb("error", "uploads");
    }
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, fileName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
