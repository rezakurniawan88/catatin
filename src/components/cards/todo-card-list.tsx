"use client"

import useFetchAllTodos from '@/hooks/todos/useFetchAllTodos';
import LoadingCard from '../loading-card'
import TodoCardItem from './todo-card-item'
import { TodoItemProps } from '@/types/todo-type';
import { useSearchContext } from '@/context/search-context';

export default function TodoCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataTodos, isLoading: loadingDataTodos } = useFetchAllTodos();

    const filteredTodos = dataTodos?.filter((data: TodoItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const otherTodos = filteredTodos?.filter((data: TodoItemProps) => data.isPinned === false && data.isArchived === false);

    return (
        <div className="mt-4 mb-10">
            <h1 className="font-sans text-sm text-slate-400">Others</h1>
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataTodos ? (
                    <LoadingCard />
                ) : otherTodos.length > 0 ? (
                    otherTodos.map((todo: any) => (
                        <TodoCardItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <div className="w-full">
                        <h1 className="text-slate-400 text-center">No Data Todos</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
