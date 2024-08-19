import { User } from "@prisma/client";

export type TodoItemProps = {
    id: string;
    title: string;
    isPinned: boolean;
    isArchived: boolean;
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
    todolist: TodoListProps[];
    userId: string;
    user: User[];
}

export type TodoListProps = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    todo: TodoItemProps;
    todoId: string;
}