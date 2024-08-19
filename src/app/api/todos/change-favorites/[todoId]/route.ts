import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Favorite Status
export async function PATCH(req: NextRequest, { params }: { params: { todoId: string } }) {
    const { todoId } = params;
    const { favoriteStatus } = await req.json();

    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                isFavorite: favoriteStatus
            }
        });
    
        return NextResponse.json(
            {
                data: todo,
                message: "Change favorite status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}