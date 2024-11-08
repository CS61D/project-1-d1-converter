import { Dropzone } from "./components/Dropzone";
import { FileItems } from "./components/FileItems";
import { useState} from "react";
import type { FileItem } from "@/types/FileItem";
function App() {
    const [files, setFiles] = useState<FileItem[]>([]);
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="p-2 text-3xl">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>
              {/* Dropzone */}
              <Dropzone files={files} setFiles={setFiles} />
              {files.length > 0 && <FileItems file={files[0]} setFiles={setFiles} />}
        {JSON.stringify(files.map((file) => file.name))}
    </div>
  );
}

export default App;
