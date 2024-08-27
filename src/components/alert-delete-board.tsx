import { LucideLoader2, LucideTrash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "./ui/use-toast";
import useFetchAllBoards from "@/hooks/boards/useFetchAllBoards";

export default function AlertDeleteBoard({ boardId }: { boardId: string }) {
    const { toast } = useToast();
    const { refetch: refetchAllBoards } = useFetchAllBoards();

    const { mutate: onDeleteBoard, isLoading: deleteBoardIsLoading } = useMutation({
        mutationKey: ["deleteBoardItem", boardId],
        mutationFn: async () => {
            const response = await axiosInstance.delete(`/boards/${boardId}`);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data,
            });
            refetchAllBoards();
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600"><LucideTrash className="w-4 text-slate-500 group-hover:text-red-500" /></div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md md:max-w-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={() => onDeleteBoard()}>{deleteBoardIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
