import { User } from "@prisma/client";

export type KanbanItemProps = {
    id: string;
    title: string;
    status: string;
    category: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User[];
}