"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useFetchAllKanbans from "@/hooks/kanbans/useFetchAllKanbans";


export default function ModalAddKanban() {
    const { toast } = useToast();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { refetch: refetchAllKanbans } = useFetchAllKanbans();
    const priorityItems = [{ id: "low", label: "Low" }, { id: "medium", label: "Medium" }, { id: "high", label: "High" }];

    const formSchema = z.object({
        title: z.string().min(2).max(100),
        priority: z.string().min(2),
        category: z.string().min(2),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            priority: "",
            category: "",
        }
    });

    const { mutate: onCreateKanban, isLoading: createKanbanIsLoading } = useMutation({
        mutationKey: "create-kanban",
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.post("/kanbans", values);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            setModalOpen(false);
            refetchAllKanbans();
            form.reset();
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
        onCreateKanban(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <button className="fixed bottom-10 md:bottom-5 right-5 p-4 hover:py-4 hover:px-5 flex items-center bg-slate-900 text-white rounded-full group hover:transition-all dark:bg-slate-800 z-40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <p className="text-xs font-semibold hidden group-hover:block">Create Kanban</p>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-sm md:text-lg">Create Kanban</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Add your new kanban here. Click save when you are done.
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
                                        <Input placeholder="Kanban title" className="text-xs md:text-sm py-1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs md:text-sm">Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type ..." className="text-xs md:text-sm" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {priorityItems.map((type) => (
                                                <SelectItem key={type.id} className="text-xs md:text-sm" value={type.id}>{type.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs md:text-sm">Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" className="text-xs md:text-sm py-1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6 dark:bg-gray-800 dark:hover:bg-gray-900">{createKanbanIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create Kanban"}</Button>
            </DialogContent>
        </Dialog>
    )
}
