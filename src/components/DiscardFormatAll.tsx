import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {FileItem} from "@/types/FileItem.tsx";
import {FormValues} from "@/components/FileItems.tsx";

export const DiscardFormatAll = ({setFiles, formatAll} : {setFiles: (files: FileItem[]) => void, formatAll: string}) => {
    const methods = useForm<FormValues>();

    return (
        <div className="flex items-center justify-center space-x-2 p-2">
            <Button type="button" onClick={() => setFiles([])}>Discard All</Button>

            <div className="rounded-md border bg-white shadow-lg">
                <Form {...methods}>
                    {/*//TODO: fix FormatAll Button displaying and inplementation*/}
                    <FormField name="formatAll" render={({field}) => (
                        <FormItem>
                            <br/>
                            <FormControl>
                                <select
                                    {...field}
                                    className="rounded-md border-2 p-1 shadow-xl"
                                >
                                    <option value="png">png</option>
                                    <option value="jpeg">jpeg</option>
                                    <option value="webp">webp</option>
                                </select>
                            </FormControl>
                        </FormItem>
                    )}/>
                </Form>
            </div>
        </div>
    );
}