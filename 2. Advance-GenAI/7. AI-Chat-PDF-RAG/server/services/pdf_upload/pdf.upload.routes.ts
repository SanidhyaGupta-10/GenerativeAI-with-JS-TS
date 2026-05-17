import express from "express";
import { upload } from "../../middleware/file.middleware.js";
import { addJob } from "../../queues/myQueue.js";
;
const router = express.Router();

router.post("/upload", upload.single("pdfFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded."
        });
    }
    const { path, originalname, destination, filename } = req.file;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    const normalizedPath = path.replace(/\\/g, '/');

    await addJob("PDF_PROCESSING", {
        filename: originalname,
        destination,
        path: normalizedPath
    });
    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
            path,
            url: fileUrl
        }
    })
})

export default router;