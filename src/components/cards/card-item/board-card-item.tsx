import useFetchAllBoards from "@/hooks/boards/useFetchAllBoards";
import { axiosInstance } from "@/lib/axios";
import { format } from "date-fns";
import { LucideArchive, LucideHeart, LucideLoader2, LucidePin } from "lucide-react";
import Link from "next/link";
import { useMutation } from "react-query";
import { useToast } from "../../ui/use-toast";
import { BoardItemProps } from "@/types/board-type";
import { usePathname } from "next/navigation";
import AlertDeleteBoard from "../../alerts/delete/alert-delete-board";

export default function BoardCardItem({ board }: { board: BoardItemProps }) {
    const { refetch: refetchAllBoards } = useFetchAllBoards();
    const formatDate = format(board?.updatedAt, "d MMMM yyyy");
    const { toast } = useToast();
    const pathname = usePathname();

    const { mutate: onChangeFavoriteStatus, isLoading: changeFavoriteStatusIsLoading } = useMutation({
        mutationKey: ["changeFavoriteStatusBoard", board?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/boards/change-favorites/${board?.id}`, { favoriteStatus: !board?.isFavorite });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllBoards();
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
        mutationKey: ["changeArchivedStatusBoard", board?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/boards/change-archived/${board?.id}`, { archivedStatus: !board?.isArchived });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllBoards();
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
        mutationKey: ["changePinnedStatusBoard", board?.id],
        mutationFn: async () => {
            const response = await axiosInstance.patch(`/boards/change-pinned/${board?.id}`, { pinnedStatus: !board?.isPinned });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            refetchAllBoards();
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
        <div className="relative flex flex-col border w-48 sm:w-80 h-44 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">
            <div className="flex justify-between w-full pt-4 pl-4 pr-2">
                <div className="mb-2">
                    <h1 className="font-bold font-sans">{board.title}</h1>
                    <p className="font-medium text-xs text-slate-400 dark:text-gray-400">{formatDate}</p>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-2">
                <div className="flex">
                    <div onClick={() => onChangeFavoriteStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600">{changeFavoriteStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideHeart className={`w-4 group-hover:text-red-500 ${board?.isFavorite ? "text-red-500" : "text-slate-500"} `} fill={board?.isFavorite ? "red" : "none"} />)}</div>
                    <div onClick={() => onChangePinnedStatus()} className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group z-30 dark:hover:bg-gray-600 ${pathname == "/favorites" ? "hidden" : pathname == "/archives" ? "hidden" : ""}`}>{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={board?.isPinned ? "gray" : "none"} />)}</div>
                </div>
                <div className="flex gap-2">
                    <div onClick={() => onChangeArchivedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 z-30 dark:hover:bg-gray-600">{changeArchivedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucideArchive className={`w-4 ${board?.isArchived ? "text-slate-800 opacity-50" : "text-slate-500 opacity-100"}`} fill={board?.isArchived ? "gray" : "none"} />)}</div>
                    <AlertDeleteBoard boardId={board.id} />
                </div>
            </div>
            <Link href={`/board/${board.id}`}>
                <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
            </Link>
        </div>
    )
}
