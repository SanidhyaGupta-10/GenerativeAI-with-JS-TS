import express from "express";
import { upload } from "../../middleware/file.middleware.js";;
const router = express.Router();

router.post("/upload", upload.single("pdfFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded."
        });
    }
    const { path } = req.file;

    res.send("File uploaded successfully");
})

export default router;