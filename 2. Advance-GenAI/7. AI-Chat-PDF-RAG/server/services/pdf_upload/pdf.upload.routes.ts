import express from "express";
import { upload } from "../../middleware/file.middleware.js";
import { addJob } from "../../queues/myQueue.js";
;
const router = express.Router();

    /* 
    * @route /upload
    * @desc This endpoint receives a PDF file upload, saves it to disk, and queues a job for background processing (embedding extraction).
    */
router.post("/upload", upload.single("pdfFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded."
        });
    }
    const { path, originalname, destination, filename } = req.file;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    const normalizedPath = path.replace(/\\/g, '/');

    const { userId, orgId } = (req as any).auth || {};

    await addJob("PDF_PROCESSING", {
        filename: originalname,
        destination,
        path: normalizedPath,
        userId,
        orgId
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