import { NoteItemProps } from "@/types/notes-type";
import { LucideArchive, LucideHeart, LucideLoader2, LucidePin } from "lucide-react";
import ModalEditNote from "../modal/modal-edit-note";
import AlertDelete from "../alert-delete";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";

export default function CardItem({ data }: { data: NoteItemProps }) {
    const { toast } = useToast();
    const { refetch: refetchAllNotes } = useFetchAllNotes();
    const formatDate = new Date(data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

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
    })

    return (
        <div key={data.id} className="relative border w-80 h-40 rounded-xl">
            <div className="flex justify-between w-full pt-4 pl-4 pr-2">
                <div className="mb-2">
                    <h1 className="font-bold font-sans">{data.title}</h1>
                    <p className="font-medium text-xs text-slate-400">{formatDate}</p>
                </div>
                <ModalEditNote noteId={data.id} />
            </div>
            <p className="font-sans text-sm text-slate-400 px-4">{data.content}</p>
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-2">
                <div className="flex">
                    <div className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group"><LucideHeart className="w-4 text-slate-500 group-hover:text-red-500" /></div>
                    <div onClick={() => onChangePinnedStatus()} className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100 group">{changePinnedStatusIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (<LucidePin className="w-4 text-slate-500 group-hover:text-slate-700" fill={data?.isPinned ? "gray" : "white"} />)}</div>
                </div>
                <div className="flex gap-2">
                    <div className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-slate-100"><LucideArchive className="w-4 text-slate-500" /></div>
                    <AlertDelete noteId={data.id} />
                </div>
            </div>
        </div>
    )
}
