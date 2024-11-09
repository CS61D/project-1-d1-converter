import { Dropzone } from "./components/Dropzone";
import { DiscardFormatAll } from "./components/DiscardFormatAll.tsx";
import { FileItems } from "./components/FileItems";
import { useState} from "react";
import type { FileItem } from "@/types/FileItem";


function App() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [formatAll, setFormatAll] = useState<string>("");

    return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="p-2 text-3xl">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>
                {/* Dropzone */}
                <Dropzone files={files} setFiles={setFiles} />
                {/* DiscardFormat All */}
                {files.length > 0 &&
                    <DiscardFormatAll setFiles={setFiles} setFormatAll={setFormatAll}/>}
                {/* File Items */}
                {files.length > 0 &&
                  files.map((file, index) => {
                        return <FileItems file={file} files={files} setFiles={setFiles}
                                          index={index} formatAll={formatAll}/>
                  })
                }
        {JSON.stringify(files.map((file) => file.name))}
    </div>
  );
}

export default App;
