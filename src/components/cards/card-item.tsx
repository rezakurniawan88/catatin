import { NoteItemProps } from "@/types/notes-type";
import { LucideArchive, LucideHeart, LucideLoader2, LucidePin } from "lucide-react";
import ModalEditNote from "../modal/modal-edit-note";
import AlertDelete from "../alert-delete";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { usePathname } from "next/navigation";
import { format } from "date-fns";

export default function CardItem({ data }: { data: NoteItemProps }) {
    const { refetch: refetchAllNotes } = useFetchAllNotes();
    // const formatDate = new Date(data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const { toast } = useToast();
    const pathname = usePathname();

    const { mutate: onChangePinnedStatus, isLoading: changePinnedStatusIsLoading } = useMutation({
        mutationKey: ["change-pinned-status", data?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/notes/change-pinned/${data?.id}`, { pinnedStatus: !data?.isPinned });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllNotes();
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: onChangeFavoriteStatus, isLoading: changeFavoriteStatusIsLoading } = useMutation({
        mutationKey: ["change-favorite-status", data?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/notes/change-favorites/${data?.id}`, { favoriteStatus: !data?.isFavorite });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllNotes();
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
        mutationKey: ["change-archived-status", data?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/notes/change-archived/${data?.id}`, { archivedStatus: !data?.isArchived });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllNotes();
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
        <>
            <div key={data.id} className="relative flex flex-col border w-48 sm:w-80 h-44 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">
                <div className="flex justify-between w-full pt-4 pl-4 pr-2">
                    <div className="mb-2">
                        <h1 className="font-bold font-sans">{data.title}</h1>
                        <p className="font-medium text-xs text-slate-400 dark:text-gray-400">{format(data?.createdAt, "d MMMM yyyy")}</p>
                    </div>
                    <ModalEditNote noteId={data.id} />
                </div>
                <div className="flex-grow">
                    <p className="font-sans text-sm text-slate-400 px-4 line-clamp-2 dark:text-gray-400">{data.content}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-2">
                    <div className="flex">
                        <div onClick={() => onChangeFavoriteStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600">{changeFavoriteStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideHeart className={`w-4 group-hover:text-red-500 ${data?.isFavorite ? "text-red-500" : "text-slate-500"} `} fill={data?.isFavorite ? "red" : "none"} />)}</div>
                        <div onClick={() => onChangePinnedStatus()} className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600 ${pathname == "/favorites" ? "hidden" : pathname == "/archives" ? "hidden" : ""}`}>{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={data?.isPinned ? "gray" : "none"} />)}</div>
                    </div>
                    <div className="flex gap-2">
                        <div onClick={() => onChangeArchivedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30 dark:hover:bg-gray-600">{changeArchivedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideArchive className={`w-4 ${data?.isArchived ? "text-slate-800 opacity-50" : "text-slate-500 opacity-100"}`} fill={data?.isArchived ? "gray" : "none"} />)}</div>
                        <AlertDelete noteId={data.id} />
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
                    </DialogTrigger>
                    <DialogContent className="max-w-full h-full sm:max-w-2xl sm:h-[90%] dark:bg-gray-900">
                        <div className="relative pl-2 pr-1">
                            <h1 className="font-bold text-lg sm:text-xl">{data.title}</h1>
                            <h1 className="text-xs text-slate-400">{format(data?.createdAt, "d MMMM yyyy")}</h1>
                            <ScrollArea className="w-full h-1/2 py-4 pr-3">
                                <p className="font-sans text-sm text-justify text-slate-500 leading-[1.4rem]">{data.content}</p>
                            </ScrollArea>
                            <div className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 px-6 border-t-[1px] overflow-hidden bg-white dark:bg-gray-900">
                                <div className="flex gap-4">
                                    <div onClick={() => onChangeFavoriteStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group dark:hover:bg-gray-600">{changeFavoriteStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideHeart className={`w-4 group-hover:text-red-500 ${data?.isFavorite ? "text-red-500" : "text-slate-500"} `} fill={data?.isFavorite ? "red" : "none"} />)}</div>
                                    <div onClick={() => onChangePinnedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group dark:hover:bg-gray-600">{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={data?.isPinned ? "gray" : "none"} />)}</div>
                                </div>
                                <div className="flex gap-4">
                                    <div onClick={() => onChangeArchivedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-600">{changeArchivedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideArchive className={`w-4 ${data?.isArchived ? "text-slate-800 opacity-50" : "text-slate-500 opacity-100"}`} fill={data?.isArchived ? "gray" : "none"} />)}</div>
                                    <AlertDelete noteId={data.id} />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
