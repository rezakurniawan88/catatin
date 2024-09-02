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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useFetchAllKanbans from "@/hooks/kanbans/useFetchAllKanbans";
import { KanbanItemProps } from "@/types/kanban-type";

interface ModalEditKanbanProps {
    item: KanbanItemProps;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalEditKanban({ item, setIsMenuOpen }: ModalEditKanbanProps) {
    const { toast } = useToast();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const priorityItems = [{ id: "low", label: "Low" }, { id: "medium", label: "Medium" }, { id: "high", label: "High" }];
    const { refetch: refetchAllKanbans } = useFetchAllKanbans();

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

    useEffect(() => {
        form.setValue("title", item?.title || "");
        form.setValue("priority", item?.priority || "");
        form.setValue("category", item?.category || "");

    }, [form, form.setValue, item]);

    const { mutate: onEditKanban, isLoading: editKanbanIsLoading } = useMutation({
        mutationKey: ["edit-kanban", item?.id],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.patch(`/kanbans/${item?.id}`, values);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllKanbans();
            toast({
                title: "Success",
                description: `${data}`,
            });
            setModalOpen(false);
            setIsMenuOpen(false);
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
        onEditKanban(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <div className="hover:bg-zinc-100 m-1 rounded-sm dark:hover:bg-gray-800">
                    <p className="text-xs pl-2 py-1.5">Edit</p>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-sm md:text-lg">Edit Kanban</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Change your kanban here. Click save when you are done.
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
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6 dark:bg-gray-800 dark:hover:bg-gray-900">{editKanbanIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Save Kanban"}</Button>
            </DialogContent>
        </Dialog>
    )
}
