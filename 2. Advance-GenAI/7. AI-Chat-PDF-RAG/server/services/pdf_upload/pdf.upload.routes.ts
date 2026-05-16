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
    const { path, filename } = req.file;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

    await addJob("PDF_PROCESSING", {
        path,
        url: fileUrl
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