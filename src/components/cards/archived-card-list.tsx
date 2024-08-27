"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import CardItem from "./card-item";
import LoadingCard from "../loading-card";
import { useSearchContext } from "@/context/search-context";
import useFetchAllTodos from "@/hooks/todos/useFetchAllTodos";
import { TodoItemProps } from "@/types/todo-type";
import TodoCardItem from "./todo-card-item";
import useFetchAllBoards from "@/hooks/boards/useFetchAllBoards";
import { BoardItemProps } from "@/types/board-type";
import BoardCardItem from "./board-card-item";

export default function ArchivedCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();
    const { data: dataTodos, isLoading: loadingDataTodos } = useFetchAllTodos();
    const { data: dataBoards, isLoading: loadingDataBoards } = useFetchAllBoards();

    const filteredNotes = dataNotes?.filter((data: NoteItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const filteredTodos = dataTodos?.filter((data: TodoItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const filteredBoards = dataBoards?.filter((data: BoardItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const archivedNotes = filteredNotes?.filter((data: NoteItemProps) => data.isArchived);
    const archivedTodos = filteredTodos?.filter((data: TodoItemProps) => data.isArchived);
    const archivedBoards = filteredBoards?.filter((data: BoardItemProps) => data.isArchived);

    return (
        <div className="mt-4 mb-10">
            <div className={archivedNotes?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Notes</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataNotes ? (
                        <LoadingCard />
                    ) :
                        archivedNotes && archivedNotes.length > 0 ? (
                            archivedNotes?.map((data: NoteItemProps) => (
                                <CardItem key={data.id} data={data} />
                            ))
                        ) : (
                            <div className="w-full">
                                <h1 className="text-slate-400 text-center">No Data Notes</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={archivedTodos?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Todos</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataTodos ? (
                        <LoadingCard />
                    ) :
                        archivedTodos && archivedTodos.length > 0 ? (
                            archivedTodos?.map((data: TodoItemProps) => (
                                <TodoCardItem key={data.id} todo={data} />
                            ))
                        ) : (
                            <div className="w-full">
                                <h1 className="text-slate-400 text-center">No Data Todos</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={archivedBoards?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Boards</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataBoards ? (
                        <LoadingCard />
                    ) :
                        archivedBoards && archivedBoards.length > 0 ? (
                            archivedBoards?.map((data: BoardItemProps) => (
                                <BoardCardItem key={data.id} board={data} />
                            ))
                        ) : (
                            <div className="w-full">
                                <h1 className="text-slate-400 text-center">No Data Boards</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
