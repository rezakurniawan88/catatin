"use client"

import useFetchAllTodos from '@/hooks/todos/useFetchAllTodos';
import LoadingCard from '../loading-card'
import TodoCardItem from './todo-card-item'
import { TodoItemProps } from '@/types/todo-type';
import { useSearchContext } from '@/context/search-context';
import Search from '../search';

export default function PinnedTodoCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataTodos, isLoading: loadingDataTodos } = useFetchAllTodos();

    const filteredTodos = dataTodos?.filter((data: TodoItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const pinnedTodos = filteredTodos?.filter((data: TodoItemProps) => data.isPinned === true && data.isArchived === false);

    return (
        <>
            <Search display={true} />
            <h1 className="font-bold font-sans text-xl mt-6">To Do List</h1>
            <div className={`pinned mt-4 mb-10 ${pinnedTodos?.length === 0 ? "hidden" : ""}`}>
                <h1 className="font-sans text-sm text-slate-400">Pinned</h1>
                <div className="flex gap-4 flex-wrap py-3">
                    {loadingDataTodos ? (
                        <LoadingCard />
                    ) : pinnedTodos.length > 0 ? (
                        pinnedTodos.map((todo: any) => (
                            <TodoCardItem key={todo.id} todo={todo} />
                        ))
                    ) : (
                        <div className="w-full">
                            <h1 className="text-slate-400 text-center">No Data Todos</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
