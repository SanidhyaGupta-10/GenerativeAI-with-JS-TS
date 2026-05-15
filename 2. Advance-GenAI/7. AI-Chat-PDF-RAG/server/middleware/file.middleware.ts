import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        if (file.mimetype.startsWith("application/pdf")) {
            callback(null, true)
        } else {
            callback(new Error("Invalid file type"))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})