import Chat from "./Chat"
import FileUpload from "./FileUpload"

function Hero() {
    return (
        <div className="w-full max-w-7xl mx-auto flex gap-6">
            {/* Left side pdf upload component */}
            <div className="w-80">
                <FileUpload />
            </div>
            {/* Right side chat with pdf */}
            <div className="flex-1">
                <Chat />
            </div>
        </div>
    )
}

export default Hero