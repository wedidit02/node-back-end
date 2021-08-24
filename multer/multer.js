const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, cd)=>{
        cd(null, "images");
    },
    filename: (req, res, cd)=>{
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cd(null, `${file.fieldname}-${Date.now()}${ext}`)
        console.log(file, ext);
    }
});

module.exports = store = multer({storage});