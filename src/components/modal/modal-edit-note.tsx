"use client"

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { LucideLoader2, LucidePencil } from "lucide-react";
import { useEffect, useState } from "react";
import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";

export default function ModalEditNote({ noteId }: { noteId: string }) {
    const { toast } = useToast();
    const { refetch: refetchAllNotes } = useFetchAllNotes();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const formSchema = z.object({
        title: z.string().min(2).max(100),
        content: z.string().min(2),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const { data: dataSingleNote } = useQuery({
        queryKey: ["fetch-single-note", noteId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/notes/${noteId}`);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const { mutate: onEditNote, isLoading: editNoteIsLoading } = useMutation({
        mutationKey: ["edit-note", noteId],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.put(`/notes/${noteId}`, values);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            setModalOpen(false);
            refetchAllNotes();
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    });

    useEffect(() => {
        form.setValue("title", dataSingleNote?.title || "");
        form.setValue("content", dataSingleNote?.content || "");

    }, [form, form.setValue, dataSingleNote]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onEditNote(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <div className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30"><LucidePencil className="w-4 text-slate-500" /></div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg">Edit Note</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Change your note here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full pt-3 pb-4 space-y-4" encType="multipart/form-data">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-sm">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Notes title." className="text-xs md:text-sm py-1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-sm">Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Note content." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6">{editNoteIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Save Note"}</Button>
            </DialogContent>
        </Dialog>
    )
}
