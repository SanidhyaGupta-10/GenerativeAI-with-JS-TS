import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
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
        fileSize: 1024 * 1024 * 50
    }
})