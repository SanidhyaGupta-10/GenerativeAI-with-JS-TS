"use client";
import { Upload } from "lucide-react";


function FileUpload() {
    return (
        <div className="glass-card h-[80vh] p-6 flex flex-col items-center justify-center ">
            <div className="mb-4 text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Upload Document</h2>
                <p className="text-white/60 text-sm">Upload your PDF to chat with AI</p>
            </div>
            <div className="space-y-4 w-full max-w-md">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">PDF File</label>
                    <div className="border-2 border-white/10 rounded-xl p-4 bg-white/5 hover:border-violet-500 transition-colors cursor-pointer flex flex-col items-center justify-center h-32">
                        <Upload className="w-10 h-10 text-violet-500 mb-2" />
                        <span className="text-white/80 text-sm">Click to upload or drag and drop</span>
                        <span className="text-white/60 text-xs mt-1">PDF files only</span>
                    </div>
                    <input type="file" accept=".pdf" className="hidden" />
                </div>
            </div>
        </div>
    )
}

export default FileUpload