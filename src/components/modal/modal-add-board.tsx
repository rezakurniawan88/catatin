"use client"

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
import { useRouter } from "next/navigation";

export default function ModalAddBoard({ displayDesktop }: { displayDesktop: boolean }) {
    const { toast } = useToast();
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const formSchema = z.object({
        title: z.string().min(2).max(100),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });

    const { mutate: onAddBoard, isLoading: addBoardIsLoading } = useMutation({
        mutationKey: ["create-board"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const result = await axiosInstance.post("/boards", { title: values.title });
            return result?.data;
        },
        onSuccess: (data) => {
            setModalOpen(false);
            toast({
                title: "Success",
                description: `${data?.message}`,
            });
            form.reset();
            router.push(`/board/${data?.data?.id}`);
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onAddBoard(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <button className={`fixed bottom-10 md:bottom-5 right-5 p-4 hover:py-4 hover:px-5 flex items-center bg-slate-900 text-white rounded-full group hover:transition-all dark:bg-slate-800 z-40 ${displayDesktop ? "block" : "block sm:hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <p className="text-xs font-semibold hidden group-hover:block">Create Board</p>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-sm md:text-lg">Create New Board</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Create your new board here. Click create when youre done.
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
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6 dark:bg-gray-800 dark:hover:bg-gray-900">{addBoardIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create Board"}</Button>
            </DialogContent>
        </Dialog>
    )
}
