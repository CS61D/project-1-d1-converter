import { useState, useRef, useEffect } from "react";
import { Dropzone } from "./components/Dropzone";
import { DiscardFormatAll } from "./components/DiscardFormatAll.tsx";
import { FileItems } from "./components/FileItems";
import type { FileItem } from "@/types/FileItem";
import { loadFfmpeg } from "@/lib/utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

function App() {
  // This ref will be passed into the convertFile function
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    // the loadFfmpeg function is defined in lib/utils.ts
    const ffmpeg_response = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
  };
  const [files, setFiles] = useState<FileItem[]>([]);
  const [formatAll, setFormatAll] = useState<string>("");
  const [formatChanged, setFormatChanged] = useState<boolean>(false);

  const delete_file = (index: number) => {
    setFiles((newFiles) => newFiles.filter((_, i) => i !== index));
  };
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="p-2 text-3xl">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>
      {/* Dropzone */}
      <Dropzone files={files} setFiles={setFiles} />
      {/* DiscardFormat All */}
      {files.length > 0 && (
        <DiscardFormatAll
          setFiles={setFiles}
          setFormatAll={setFormatAll}
          setFormatChanged={setFormatChanged}
        />
      )}
      {/* File Items */}
      {files.length > 0 &&
        files.map((file, index) => {
          return (
            <FileItems
              file={file}
              index={index}
              formatAll={formatAll}
              formatChanged={formatChanged}
              deleteFile={delete_file}
              setFormatChanged={setFormatChanged}
              key={file.name}
              ffmpegRef={ffmpegRef.current}
            />
          );
        })}
      {JSON.stringify(files.map((file) => file.name))}
    </div>
  );
}

export default App;
