const { uploadFile, getImage } = require("../controllers/image-controller");
const upload = require('../utils/upload');
const router = require("express").Router();


router.post('/file/upload', upload.single('file'), uploadFile);
router.get('/file/:filename', getImage);


module.exports = router;