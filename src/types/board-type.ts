import { User } from "@prisma/client";

export type BoardItemProps = {
    id: string;
    title: string;
    data: string;
    isPinned: boolean;
    isArchived: boolean;
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
    user: User[];
    userId: string;
}