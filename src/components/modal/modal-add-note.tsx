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
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";

export default function ModalAddNote({ displayDesktop }: { displayDesktop: boolean }) {
    const { toast } = useToast();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { refetch: refetchAllNotes } = useFetchAllNotes();

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

    const { mutate: onAddNote, isLoading: addNoteIsLoading } = useMutation({
        mutationKey: "add-note",
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.post("/notes", values);
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onAddNote(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <button className={`fixed bottom-12 sm:bottom-5 right-5 p-4 bg-slate-900 rounded-full hover:bg-slate-700 z-50 ${displayDesktop ? "block" : "block sm:hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-sm md:text-lg">Create New Note</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Add your new note here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full pt-3 pb-4 space-y-4" encType="multipart/form-data">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs md:text-sm">Title</FormLabel>
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
                                    <FormLabel className="font-semibold text-xs md:text-sm">Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Note content." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6 dark:bg-gray-800 dark:hover:bg-gray-900">{addNoteIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create Note"}</Button>
            </DialogContent>
        </Dialog>
    )
}
