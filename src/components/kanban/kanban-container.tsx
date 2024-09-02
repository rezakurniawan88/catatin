"use client"

import { DragDropContext } from "@hello-pangea/dnd";
import KanbanSection from "./kanban-section";
import useFetchAllKanbans from "@/hooks/kanbans/useFetchAllKanbans";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "react-query";
import { useToast } from "../ui/use-toast";
import { KanbanItemProps } from "@/types/kanban-type";

export default function KanbanContainer() {
    const { data: dataKanbans, refetch: refetchAllKanbans } = useFetchAllKanbans();
    const [loadingKanbanId, setLoadingKanbanId] = useState<string | null>(null);
    const { toast } = useToast();

    const { mutate: onChangeStatusKanban } = useMutation({
        mutationKey: ["edit-status-kanban"],
        mutationFn: async ({ kanbanId, newStatus }: { kanbanId: string, newStatus: string }) => {
            const result = await axiosInstance.patch(`/kanbans/change-status/${kanbanId}`, { newStatus });
            return result?.data?.message;
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: `${data}`,
            });
            setLoadingKanbanId(null);
            refetchAllKanbans();
        },
        onError: (error) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    })

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const kanbanId = result.draggableId;
        const newStatus = result.destination.droppableId;

        setLoadingKanbanId(kanbanId);
        onChangeStatusKanban({ kanbanId, newStatus });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative overflow-x-hidden mt-4">
                <div className="flex flex-col md:flex-row h-full min-h-screen">
                    <KanbanSection title="Todo" status="todo" items={dataKanbans?.filter((item: KanbanItemProps) => item?.status === "todo")} loadingKanbanId={loadingKanbanId} />
                    <KanbanSection title="In Progress" status="progress" items={dataKanbans?.filter((item: KanbanItemProps) => item?.status === "progress")} loadingKanbanId={loadingKanbanId} />
                    <KanbanSection title="Done" status="done" items={dataKanbans?.filter((item: KanbanItemProps) => item?.status === "done")} loadingKanbanId={loadingKanbanId} />
                </div>
            </div>
        </DragDropContext>
    )
}
