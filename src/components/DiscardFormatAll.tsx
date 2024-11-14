import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import type {FileItem} from "@/types/FileItem.tsx";
import type {FormValues} from "@/components/FileItems.tsx";

export const DiscardFormatAll = ({setFiles, setFormatAll, setFormatChanged} : {setFiles: (files: FileItem[]) => void,
    setFormatAll: (formatAll: string) => void, setFormatChanged: (formatChanged: boolean) => void}) => {
    const methods = useForm<FormValues>();

    return (
        <div className="flex items-center justify-center space-x-2 p-2">
            <Button type="button" onClick={() => setFiles([])}>Discard All</Button>
                <Form {...methods}>
                    <FormField name="formatAll" render={({field}) => (
                        <FormItem className="">
                            <FormControl>
                                <select
                                    {...field}
                                    className="rounded-md border-2 p-1 shadow-xl"
                                    defaultValue={""}
                                    onChange={(e) => {
                                        setFormatAll(e.target.value);
                                        setFormatChanged(false)
                                    }}
                                >
                                    <option value="" disabled>Format All:</option>
                                    <option value="png">Format All: png</option>
                                    <option value="jpeg">Format All: jpeg</option>
                                    <option value="webp">Format All: webp</option>
                                </select>
                            </FormControl>
                        </FormItem>
                    )}/>
                </Form>
        </div>
    );
}