import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { convertFile, formatFileSize, loadFfmpeg, downloadFile} from "@/lib/utils";
import type { FileItem } from "@/types/FileItem";
import {useEffect, useState, useRef} from "react";
import { CircleXIcon } from "lucide-react";
export type FormValues = {
    fileName: string;
    formatAll: string;
    format: string;
};

function sizeDiff(before: number, after: number) {
    const percentageDiff = ((after - before) / before) * 100;
    const color = percentageDiff >= 0 ? 'green' : 'red';
    return (
        <p style={{ color: color }}>
            {percentageDiff.toFixed(2)}%
        </p>
    );
}
function outputFileNameFormat(newName: string, format: string) {
    const types = ["jpeg", "png", "webp"]
    if (newName.includes('.')) {
        if (types.some(type => newName.includes(type))){
            return `${newName.split('.').slice(0, -1).join('.')}.${format}`
        } else {
            return `${newName}.${format}`
        }}
    else {
        return `${newName}.${format}`

    }
}
function display_button(file: FileItem, converted: boolean,  format: string,
                        newName: string, setConverted: (converted: boolean) => void, ffmpeg: any) {
    if (!converted) {
        return (
            <div>
                <Button type="button" onClick={ async () => {

                    console.log(format);
                    let outputFileName = outputFileNameFormat(newName, format);
                    console.log(outputFileName);

                    const result = await convertFile(ffmpeg, file.file, `${newName}.${format}`);
                    console.log('worked')
                    setConverted(!converted);
                    file.sizeAfter = result.outputFileSize;
                    file.name = outputFileName;

                }}>Convert</Button>
            </div>
        );
    }
    return (
        <div>
            <Button type="button" onClick={() => {
                downloadFile(URL.createObjectURL(file.file), file.name);
            }}>Download {formatFileSize(file.sizeAfter)}</Button>
            {file.sizeAfter !== undefined && sizeDiff(file.size, file.sizeAfter)}
        </div>
    );
}

export const FileItems = ({ file, index, formatAll, deleteFile, formatChanged, setFormatChanged}:
                              { file: FileItem, index: number , formatAll: string, formatChanged: boolean,
                                  setFormatChanged: (formatChanged: boolean) => void,
                                    deleteFile: (index: number) => void
                              }) => {
    const [format, setFormat] = useState<string>(file.format);
    const [newName, setNewName] = useState<string>(file.name);
    const methods = useForm<FormValues>();
    const [converted, setConverted] = useState<boolean>(false);

    // This ref will be passed into the convertFile function
    const ffmpegRef = useRef<any | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        // the loadFfmpeg function is defined in lib/utils.ts
        const ffmpeg_response: any = await loadFfmpeg();
        ffmpegRef.current = ffmpeg_response;
    };


    useEffect(() => {
        if (!formatChanged) {
            setFormat(formatAll);
        }
    }, [formatAll, formatChanged]);

    return (
        <div>
            <Form {...methods}>
                <form >
                    <div style={{ display: "flex", alignItems: "start", gap: "10px" }}
                         className="rounded-md border-2 p-1 shadow-xl">
                        <p>
                            <span style={{ fontWeight: "bolder" }}>{file.name}</span>
                            <br />
                            {formatFileSize(file.size)}
                        </p>
                        <FormField name="fileName"
                                   control={methods.control}
                                   defaultValue={file.name}
                                   render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Filename</FormLabel>
                                <br />
                                <FormControl>
                                    <input {...field}
                                    value={newName}
                                    className="rounded-md border-2 p-1 shadow-xl" 
                                    onChange={(e) => { setNewName(e.target.value); field.onChange(e); }}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="format" control={methods.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Format</FormLabel>
                                <br />
                                <FormControl>
                                    <select {...field}
                                            className="rounded-md border-2 p-1 shadow-xl"
                                        value={!formatChanged ? formatAll : format}
                                        onChange={(e) => {
                                            setFormatChanged(true);
                                            setFormat(e.target.value);
                                            field.onChange(e);
                                        }}
                                    >
                                        <option value="png">png</option>
                                        <option value="jpeg">jpeg</option>
                                        <option value="webp">webp</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )} />
                        {display_button(file, converted, format, newName, setConverted, ffmpegRef.current)}
                        <Button className="bg-transparent hover:bg-transparent" onClick={() => deleteFile(index)}>
                            <CircleXIcon className="rounded-full bg-white text-black" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};