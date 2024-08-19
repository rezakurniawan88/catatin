import { format } from "date-fns";
import { LucideArchive, LucideHeart, LucideLoader2, LucidePencil, LucidePin, LucideX } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import useFetchAllTodos from "@/hooks/todos/useFetchAllTodos";
import { TodoItemProps, TodoListProps } from "@/types/todo-type";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AlertDeleteTodo from "../alert-delete-todo";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";

export default function TodoCardItem({ todo }: { todo: TodoItemProps }) {
    const { toast } = useToast();
    const pathname = usePathname();
    const { refetch: refetchAllTodos } = useFetchAllTodos();
    const formatedDate = format(todo.updatedAt, "dd MMMM yyyy");
    const todoNotCompleted = todo?.todolist.filter((todo: any) => !todo.completed);
    const todoCompleted = todo?.todolist.filter((todo: any) => todo.completed);
    const [checkedItemId, setCheckedItemId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [titleEdited, setTitleEdited] = useState<string>(todo?.title || "");
    const [todolistEdited, setTodolistEdited] = useState<{ [key: string]: string }>(
        Object.fromEntries(todo?.todolist.map(item => [item.id, item.title]))
    );
    const [hasChanges, setHasChanges] = useState(false);

    const { mutate: onAddTodolist, isLoading: addTodolistIsLoading } = useMutation({
        mutationKey: ["addTodolist"],
        mutationFn: async () => {
            const result = await axiosInstance.post("/todos/todolist", { title: inputRef.current?.value, todoId: todo.id });
            return result?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const { mutate: handleChecklistTodo, isLoading: checklistIsLoading } = useMutation({
        mutationKey: ["handleChecklistTodo"],
        mutationFn: async ({ todolistId, status }: { todolistId: string, status: boolean }) => {
            setCheckedItemId(todolistId);
            const result = await axiosInstance.patch(`/todos/todolist/${todolistId}`, { checkStatus: !status });
            return result?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            setCheckedItemId(null);
        },
        onError: (error) => {
            console.log(error);
            setCheckedItemId(null);
        }
    });

    const { mutate: onUpdateTodo, isLoading: updateTodoIsLoading } = useMutation({
        mutationKey: ["updateTodo"],
        mutationFn: async () => {
            const updatedDataTodo = {
                todoId: todo?.id,
                todoTitle: titleEdited,
                todolist: todo.todolist.map(item => ({
                    id: item.id,
                    title: todolistEdited[item.id] || item.title
                }))
            };

            const response = await axiosInstance.put("/todos", updatedDataTodo);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            setIsEditMode?.(false);
            toast({
                title: "Success",
                description: `${data}`,
            });
            refetchAllTodos();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: onDeleteTodoList, isLoading: deleteTodolistIsLoading } = useMutation({
        mutationKey: ["deleteTodoList"],
        mutationFn: async (todolistId: string) => {
            setCheckedItemId(todolistId);
            const result = await axiosInstance.delete(`/todos/todolist/${todolistId}`);
            return result?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            setCheckedItemId(null);
        },
        onError: (error) => {
            console.log(error);
            setCheckedItemId(null);
        }
    });

    const { mutate: onChangeFavoriteStatus, isLoading: changeFavoriteStatusIsLoading } = useMutation({
        mutationKey: ["changeFavoriteStatusTodo", todo?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/todos/change-favorites/${todo?.id}`, { favoriteStatus: !todo?.isFavorite });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: onChangeArchivedStatus, isLoading: changeArchivedStatusIsLoading } = useMutation({
        mutationKey: ["changeArchivedStatusTodo", todo?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/todos/change-archived/${todo?.id}`, { archivedStatus: !todo?.isArchived });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: onChangePinnedStatus, isLoading: changePinnedStatusIsLoading } = useMutation({
        mutationKey: ["changePinnedStatusTodo", todo?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/todos/change-pinned/${todo?.id}`, { pinnedStatus: !todo?.isPinned });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllTodos();
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return (
        <div key={todo.id} className="relative flex flex-col border w-48 sm:w-80 h-44 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">
            <div className="flex justify-between w-full pt-4 pl-4 pr-2">
                <div className="mb-2">
                    <h1 className="font-bold font-sans">{todo.title}</h1>
                    <p className="font-medium text-xs text-slate-400 dark:text-gray-400">{formatedDate}</p>
                </div>
            </div>
            <div className="flex-grow pl-4 space-y-1">
                {todoNotCompleted.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <Checkbox disabled id="todo" className="text-xs md:text-sm" />
                        <label htmlFor="todo" className="text-sm text-slate-400 line-clamp-1 dark:text-gray-400">{item?.title}</label>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-2">
                <div className="flex">
                    <div onClick={() => onChangeFavoriteStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600">{changeFavoriteStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideHeart className={`w-4 group-hover:text-red-500 ${todo?.isFavorite ? "text-red-500" : "text-slate-500"} `} fill={todo?.isFavorite ? "red" : "none"} />)}</div>
                    <div onClick={() => onChangePinnedStatus()} className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600 ${pathname == "/favorites" ? "hidden" : pathname == "/archives" ? "hidden" : ""}`}>{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={todo?.isPinned ? "gray" : "none"} />)}</div>
                </div>
                <div className="flex gap-2">
                    <div onClick={() => onChangeArchivedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30 dark:hover:bg-gray-600">{changeArchivedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideArchive className={`w-4 ${todo?.isArchived ? "text-slate-800 opacity-50" : "text-slate-500 opacity-100"}`} fill={todo?.isArchived ? "gray" : "none"} />)}</div>
                    <AlertDeleteTodo todoId={todo.id} />
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
                </DialogTrigger>
                <DialogContent className="max-w-full h-full sm:max-w-2xl sm:h-[90%] dark:bg-gray-900">
                    <div className="relative pl-2 pr-1">
                        <div className="flex justify-between items-center">
                            <div className={isEditMode ? "mb-4" : ""}>
                                {isEditMode ? (
                                    <Input value={titleEdited} autoFocus={true} onChange={(e) => {
                                        setTitleEdited(e.target.value)
                                        setHasChanges(e.target.value !== todo?.title);
                                    }}
                                        className="font-bold text-lg sm:text-xl bg-transparent border-none outline-none focus-visible:ring-transparent -ml-3" />
                                ) : (
                                    <DialogTitle className="font-bold text-lg sm:text-xl">{todo.title}</DialogTitle>
                                )}
                                <h1 className="text-xs text-slate-400">{formatedDate}</h1>
                            </div>
                            {isEditMode ? (
                                <Button type="button" className={!hasChanges ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300" : ""} onClick={() => onUpdateTodo()}>{updateTodoIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Save Changes"}</Button>
                            ) : null}
                        </div>
                        {isEditMode ? null : (
                            <div className="flex items-center gap-2 py-4">
                                <Input ref={inputRef} placeholder="Input your todo here" className="text-xs md:text-sm py-1 focus-visible:ring-transparent" />
                                <Button onClick={() => onAddTodolist()} type="button" className="text-xs md:text-sm">{addTodolistIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Add"}</Button>
                            </div>
                        )}
                        <ScrollArea className="w-full h-3/4 pb-4 pr-3">
                            <h1 className="text-sm font-medium text-slate-500 pb-2">Todos</h1>
                            <div className="space-y-2">
                                {todoNotCompleted?.map((todo: TodoListProps, index: number) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        {checklistIsLoading && checkedItemId === todo?.id ? (<LucideLoader2 size={16} className="animate-spin" />) : (
                                            <Checkbox checked={todo.completed} onCheckedChange={() => handleChecklistTodo({ todolistId: todo?.id, status: todo?.completed })} id="todo" className="text-xs md:text-sm" />
                                        )}
                                        {isEditMode ? (
                                            <Input
                                                value={todolistEdited[todo?.id]}
                                                onChange={(e) => setTodolistEdited(prev => {
                                                    const updated = { ...prev, [todo?.id]: e.target.value };
                                                    setHasChanges(e.target.value !== todo?.title);
                                                    return updated;
                                                })}
                                                className="text-sm bg-transparent border-none outline-none focus-visible:ring-transparent p-0"
                                            />
                                        ) : (
                                            <label htmlFor="todo" className="text-sm">{todo?.title}</label>
                                        )}
                                        {isEditMode ? null : (
                                            <>
                                                {deleteTodolistIsLoading && checkedItemId === todo?.id ? (<LucideLoader2 size={16} className="animate-spin" />) : (
                                                    <button type="button" onClick={() => onDeleteTodoList(todo?.id)} className="rounded-full p-1 text-red-500 hover:bg-slate-100"><LucideX size={14} /></button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-sm font-medium text-slate-500 pt-4 pb-2">Completed</h1>
                            <div className="space-y-2">
                                {todoCompleted?.map((todo: TodoListProps, index: number) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        {checklistIsLoading && checkedItemId === todo?.id ? (<LucideLoader2 size={16} className="animate-spin" />) : (
                                            <Checkbox checked={todo.completed} onCheckedChange={() => handleChecklistTodo({ todolistId: todo?.id, status: todo?.completed })} id="todo" className="text-xs md:text-sm" />
                                        )}
                                        {isEditMode ? (
                                            <Input
                                                value={todolistEdited[todo?.id]}
                                                onChange={(e) => setTodolistEdited(prev => {
                                                    const updated = { ...prev, [todo?.id]: e.target.value };
                                                    setHasChanges(e.target.value !== todo?.title);
                                                    return updated;
                                                })}
                                                className="text-sm line-through bg-transparent border-none outline-none focus-visible:ring-transparent p-0"
                                            />
                                        ) : (
                                            <label htmlFor="todo" className="text-sm line-through">{todo?.title}</label>
                                        )}
                                        {isEditMode ? null : (
                                            <>
                                                {deleteTodolistIsLoading && checkedItemId === todo?.id ? (<LucideLoader2 size={16} className="animate-spin" />) : (
                                                    <button type="button" onClick={() => onDeleteTodoList(todo?.id)} className="rounded-full p-1 text-red-500 hover:bg-slate-100"><LucideX size={14} /></button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 px-6 border-t-[1px] overflow-hidden bg-white dark:bg-gray-900">
                            <div className="flex gap-4">
                                <div onClick={() => onChangeFavoriteStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600">{changeFavoriteStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideHeart className={`w-4 group-hover:text-red-500 ${todo?.isFavorite ? "text-red-500" : "text-slate-500"} `} fill={todo?.isFavorite ? "red" : "none"} />)}</div>
                                <div onClick={() => onChangePinnedStatus()} className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600 ${pathname == "/favorites" ? "hidden" : pathname == "/archives" ? "hidden" : ""}`}>{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={todo?.isPinned ? "gray" : "none"} />)}</div>
                            </div>
                            <div className="flex gap-4">
                                <div onClick={() => setIsEditMode?.(!isEditMode)} className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30 dark:hover:bg-gray-600 ${isEditMode ? "bg-slate-100" : ""}`}><LucidePencil className="w-4 text-slate-500" /></div>
                                <div onClick={() => onChangeArchivedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30 dark:hover:bg-gray-600">{changeArchivedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideArchive className={`w-4 ${todo?.isArchived ? "text-slate-800 opacity-50" : "text-slate-500 opacity-100"}`} fill={todo?.isArchived ? "gray" : "none"} />)}</div>
                                <AlertDeleteTodo todoId={todo.id} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}