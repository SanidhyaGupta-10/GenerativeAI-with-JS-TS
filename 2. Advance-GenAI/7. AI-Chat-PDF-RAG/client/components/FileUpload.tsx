"use client";
import { Upload } from "lucide-react";
import useFileUpload from "@/hooks/useFileUpload";

function FileUpload() {
    const { uploadPDF } = useFileUpload();
    // This will create a file input element and click it
    const handleFileUpload = () => {
        const el = document.createElement("input")
        el.setAttribute("type", "file")
        el.setAttribute("accept", ".pdf")
        el.click()
        el.addEventListener("change", async (e: Event) => {
            const target = e.target as HTMLInputElement
            const file = target.files?.[0]
            if (file) {
                const res = await uploadPDF(file)
                console.log("res", res)
            }
        })
    }

    return (
        <div className="glass-card h-[80vh] p-6 flex flex-col items-center justify-center ">
            <div className="mb-4 text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Upload Document</h2>
                <p className="text-white/60 text-sm">Upload your PDF to chat with AI</p>
            </div>
            <div className="space-y-4 w-full max-w-md">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">PDF File</label>
                    <div onClick={handleFileUpload} className="border-2 border-white/10 rounded-xl p-4 bg-white/5 hover:border-violet-500 transition-colors cursor-pointer flex flex-col items-center justify-center h-32">
                        <Upload className="w-10 h-10 text-violet-500 mb-2" />
                        <span className="text-white/80 text-sm">Click to upload or drag and drop</span>
                        <span className="text-white/60 text-xs mt-1">PDF files only</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload