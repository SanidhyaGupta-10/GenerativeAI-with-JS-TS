import { api } from '@/lib/axios';
import { useAuth } from '@clerk/nextjs';

/**
 * @hook useFileUpload
 * @description Provides functionality to upload a PDF file to the backend. It securely attaches the user's authentication token to the multipart form data request.
 * @returns {Object} Exposes the `uploadPDF` asynchronous function to trigger the upload.
 */
function useFileUpload() {
    const { getToken } = useAuth();

    const uploadPDF = async (file: File) => {
        const token = await getToken();
        const formData = new FormData();
        formData.append("pdfFile", file);
        const res = await api.post("/pdf/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return res.data;
    };

    return { uploadPDF };
}

export default useFileUpload