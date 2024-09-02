import { LucideLoader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "./ui/use-toast";
import useFetchAllKanbans from "@/hooks/kanbans/useFetchAllKanbans";

export default function AlertDeleteKanban({ kanbanId }: { kanbanId: string }) {
    const { toast } = useToast();
    const { refetch: refetchAllKanbans } = useFetchAllKanbans();

    const { mutate: onDeleteKanban, isLoading: deleteKanbanIsLoading } = useMutation({
        mutationKey: ["deleteKanban", kanbanId],
        mutationFn: async () => {
            const response = await axiosInstance.delete(`/kanbans/${kanbanId}`);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data,
            });
            refetchAllKanbans();
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="hover:bg-zinc-100 hover:text-red-500 m-1 rounded-sm dark:hover:bg-gray-800">
                    <p className="text-xs pl-2 py-1.5">Delete</p>
                </div>
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
                    <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={() => onDeleteKanban()}>{deleteKanbanIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
