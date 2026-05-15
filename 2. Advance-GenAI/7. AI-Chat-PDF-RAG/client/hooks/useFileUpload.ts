import { api } from '@/lib/axios';
import { useAuth } from '@clerk/nextjs';

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