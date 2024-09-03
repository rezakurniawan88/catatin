"use client"

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { LucideLoader2, LucideX } from "lucide-react";
import { useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import useFetchAllTodos from "@/hooks/todos/useFetchAllTodos";

export default function ModalAddTodo({ displayDesktop }: { displayDesktop: boolean }) {
    const { toast } = useToast();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [initTodo, setInitTodo] = useState<any>([]);
    const todoRef = useRef<HTMLInputElement>(null);
    const { refetch: refetchAllTodos } = useFetchAllTodos();

    const formSchema = z.object({
        title: z.string().min(2).max(100),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });

    const addTodoInit = () => {
        const todo = todoRef?.current?.value;
        if (todo) {
            setInitTodo([...initTodo, todo]);
            if (todoRef.current) {
                todoRef.current.value = '';
            }
        }
    };

    const removeTodoInit = (index: number) => {
        setInitTodo(initTodo.filter((_: any, i: number) => i !== index));
    }

    const { mutate: onAddTodo, isLoading: addTodoIsLoading } = useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const result = await axiosInstance.post("/todos", { title: values.title, todos: initTodo });
            return result?.data?.message;
        },
        onSuccess: (data) => {
            setModalOpen(false);
            refetchAllTodos();
            toast({
                title: "Success",
                description: `${data}`,
            });
            form.reset();
            setInitTodo([]);
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
        onAddTodo(values);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <button className={`fixed bottom-10 md:bottom-5 right-5 p-4 hover:py-4 hover:px-5 flex items-center bg-slate-900 text-white rounded-full group hover:transition-all dark:bg-slate-800 z-40 ${displayDesktop ? "block" : "block sm:hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <p className="text-xs font-semibold hidden group-hover:block">Create Todo</p>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-sm md:text-lg">Create To Do</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Add your new todo here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full pt-3" encType="multipart/form-data">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs md:text-sm">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" className="text-xs md:text-sm py-1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div>
                    <h1 className="font-semibold text-xs md:text-sm pb-2">Todos</h1>
                    <div className="flex items-center gap-2">
                        <Input ref={todoRef} placeholder="Input your todo here" className="text-xs md:text-sm py-1" />
                        <Button onClick={addTodoInit} type="button" className="text-xs md:text-sm">Add</Button>
                    </div>
                </div>
                <ScrollArea className="h-full max-h-40 w-full">
                    <div className="space-y-2">
                        {initTodo.length <= 0 ? null
                            : initTodo.map((todo: any, index: number) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Checkbox id="todo" className="text-xs md:text-sm" />
                                    <label htmlFor="todo" className="text-sm">{todo}</label>
                                    <button onClick={() => removeTodoInit(index)} type="button" className="border rounded-full p-1 hover:text-red-500"><LucideX size={14} /></button>
                                </div>
                            ))}
                    </div>
                </ScrollArea>
                <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6 dark:bg-gray-800 dark:hover:bg-gray-900">{addTodoIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create ToDo"}</Button>
            </DialogContent>
        </Dialog>
    )
}
