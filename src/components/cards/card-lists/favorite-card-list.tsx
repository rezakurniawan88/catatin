"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import NoteCardItem from "../card-item/note-card-item";
import LoadingCard from "../../loading-card";
import { useSearchContext } from "@/context/search-context";
import useFetchAllTodos from "@/hooks/todos/useFetchAllTodos";
import { TodoItemProps } from "@/types/todo-type";
import TodoCardItem from "../card-item/todo-card-item";
import useFetchAllBoards from "@/hooks/boards/useFetchAllBoards";
import { BoardItemProps } from "@/types/board-type";
import BoardCardItem from "../card-item/board-card-item";

export default function FavoriteCardList() {
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

    const favoriteNotes = filteredNotes?.filter((data: NoteItemProps) => data.isFavorite);
    const favoriteTodos = filteredTodos?.filter((data: TodoItemProps) => data.isFavorite);
    const favoriteBoards = filteredBoards?.filter((data: BoardItemProps) => data.isFavorite);

    return (
        <div className="mt-4 mb-10">
            <div className={favoriteNotes?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Notes</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataNotes ? (
                        <LoadingCard />
                    ) :
                        favoriteNotes && favoriteNotes.length > 0 ? (
                            favoriteNotes?.map((data: NoteItemProps) => (
                                <NoteCardItem key={data.id} data={data} />
                            ))
                        ) : (
                            <div className="w-full">
                                <h1 className="text-slate-400 text-center">No Data Notes</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={favoriteTodos?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Todos</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataTodos ? (
                        <LoadingCard />
                    ) :
                        favoriteTodos && favoriteTodos.length > 0 ? (
                            favoriteTodos?.map((data: TodoItemProps) => (
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
            <div className={favoriteBoards?.length === 0 ? "hidden" : ""}>
                <h1 className="font-medium text-gray-400">Boards</h1>
                <div className="flex gap-4 flex-wrap pt-3 pb-8">
                    {loadingDataBoards ? (
                        <LoadingCard />
                    ) :
                        favoriteBoards && favoriteBoards.length > 0 ? (
                            favoriteBoards?.map((data: BoardItemProps) => (
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
