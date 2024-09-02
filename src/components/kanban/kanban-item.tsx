import { Draggable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { useState } from "react";
import ModalEditKanban from "../modal/modal-edit-kanban";
import AlertDeleteKanban from "../alert-delete-kanban";
import { LucideLoader2 } from "lucide-react";
import { KanbanItemProps } from "@/types/kanban-type";

interface IKanbanItem {
    item: KanbanItemProps
    index: number;
    loadingKanbanId: string | null;
}

export default function KanbanItem({ item, index, loadingKanbanId }: IKanbanItem) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const formatDate = format(item?.updatedAt, "d MMMM yyyy");
    const priorityCapitalize = item?.priority?.replace(/\b[a-z]/g, (match) => match.toUpperCase());

    const toggleMenuShow = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex-shrink-0 ml-2">
                    <div className="relative flex flex-col border w-72 md:w-[19rem] h-44 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">
                        <div className="flex justify-between w-full pt-4 pl-4 pr-2">
                            <div className="ml-1 w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${item.priority === "low" ? "text-blue-500 dark:text-blue-400" : item.priority === "medium" ? "text-yellow-500 dark:text-yellow-400" : item.priority === "high" ? "text-red-600 dark:text-red-400" : ""}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" /></svg>
                                        <h1 className={`text-xs font-semibold ${item.priority === "low" ? "text-blue-500 dark:text-blue-400" : item.priority === "medium" ? "text-yellow-500 dark:text-yellow-400" : item.priority === "high" ? "text-red-600 dark:text-red-400" : ""}`}>{priorityCapitalize} Priority</h1>
                                    </div>
                                    <button onClick={() => toggleMenuShow()} className="p-1 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                                    </button>
                                </div>
                                <div className="menu-list">
                                    <div className={isMenuOpen ? "absolute right-5 w-2/6 bg-white border drop-shadow-sm rounded-md dark:bg-slate-900 dark:border-slate-100/20" : "hidden"}>
                                        <ModalEditKanban item={item} setIsMenuOpen={setIsMenuOpen} />
                                        <AlertDeleteKanban kanbanId={item?.id} />
                                    </div>
                                </div>
                                <h1 className="font-semibold text-sm">{item.title}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-500 dark:text-slate-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                                    <p className="font-medium text-xs text-slate-400 dark:text-gray-400">{formatDate}</p>
                                </div>
                                <button className="text-xs font-medium mt-6 px-4 py-2 rounded-full border dark:border-slate-100/10 cursor-none">{item.category}</button>
                            </div>
                        </div>
                        {loadingKanbanId === item.id && <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                            <LucideLoader2 className="h-8 w-8 animate-spin text-gray-700 dark:text-gray-300" />
                        </div>}
                    </div>
                </div>
            )}
        </Draggable>
    )
}
