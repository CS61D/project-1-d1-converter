import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import type { FileItem } from "@/types/FileItem.tsx";

export const Dropzone = ({ files, setFiles }: { files: FileItem[], setFiles: (files: FileItem[]) => void }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: ImageMimeTypes,
        onDrop: (newFiles: File[]) => {
            const fileItems = newFiles.map((file) => ({
                file,
                format: file.type,
                name: file.name,
                size: file.size,
            }));
            setFiles([...files, ...fileItems]);
        },
    });

    return (
        <div className="h-64 w-64 rounded-lg border-2 border-gray-300 border-dashed p-2 flex justify-center items-center">
            <div {...getRootProps()} className="text-center">
                <input {...getInputProps()} />
                <div className="text-center text-gray-500 text-xl" >
                    Drag & drop an images here, or click to select files
                    <br/>
                    Supported input formats: png, jpeg, webp
                </div>
            </div>
        </div>
    );
};