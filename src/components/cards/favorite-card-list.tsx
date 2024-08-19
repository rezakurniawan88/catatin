"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import CardItem from "./card-item";
import LoadingCard from "../loading-card";
import { useSearchContext } from "@/context/search-context";
import useFetchAllTodos from "@/hooks/todos/useFetchAllTodos";
import { TodoItemProps } from "@/types/todo-type";
import TodoCardItem from "./todo-card-item";

export default function FavoriteCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();
    const { data: dataTodos, isLoading: loadingDataTodos } = useFetchAllTodos();

    const filteredNotes = dataNotes?.filter((data: NoteItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const favoriteNotes = filteredNotes?.filter((data: NoteItemProps) => data.isFavorite);
    const favoriteTodos = dataTodos?.filter((data: TodoItemProps) => data.isFavorite);

    return (
        <div className="pinned mt-4 mb-10">
            <h1 className="font-medium text-gray-400">Notes</h1>
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataNotes ? (
                    <LoadingCard />
                ) :
                    favoriteNotes && favoriteNotes.length > 0 ? (
                        favoriteNotes?.map((data: NoteItemProps) => (
                            <CardItem key={data.id} data={data} />
                        ))
                    ) : (
                        <div className="w-full">
                            <h1 className="text-slate-400 text-center">No Data Notes</h1>
                        </div>
                    )
                }
            </div>
            <h1 className="font-medium text-gray-400">Todos</h1>
            <div className="flex gap-4 flex-wrap py-3">
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
    )
}
