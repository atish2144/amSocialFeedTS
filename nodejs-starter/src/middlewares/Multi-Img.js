const multer = require('multer')
const path = require("path")
const logger=require("../config/logger")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Image")    
    },
    filename: (req, file, cb) => {
      logger.info(file);
        if (file)
            cb(null, Date.now() + path.extname(file.originalname))
    }
})
// logger.info(storage);
const upload = multer({ storage: storage })
const multiImage=upload.array("Image",10);
const singleImage=upload.single("Image");


module.exports = {
    multiImage,
    singleImage

}

