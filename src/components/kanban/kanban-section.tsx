import { Droppable } from "@hello-pangea/dnd";
import KanbanItem from "./kanban-item";
import { KanbanItemProps } from "@/types/kanban-type";

interface KanbanSectionProps {
    title: string;
    status: string;
    items: KanbanItemProps[];
    loadingKanbanId: string | null;
}

export default function KanbanSection({ title, status, items, loadingKanbanId }: KanbanSectionProps) {
    return (
        <Droppable droppableId={status} type="TASKS">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className={`flex flex-col md:items-center w-full md:w-1/3 pt-4 md:border ${snapshot.isDraggingOver ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                    {...provided.droppableProps}
                >
                    <h1 className="font-semibold mb-4 ml-2 md:ml-0">{title} <span>({items?.length})</span></h1>
                    <div className="flex flex-row md:flex-col items-center gap-4 w-full h-full overflow-y-auto no-scrollbar">
                        {items && items.length > 0 ? (
                            items.map((item, index) => (
                                <KanbanItem key={item.id} item={item} index={index} loadingKanbanId={loadingKanbanId} />
                            ))
                        ) : (
                            <div className="flex justify-center items-center w-full h-full my-10">
                                <h1 className="text-center text-gray-500">No Data Kanban</h1>
                            </div>
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}