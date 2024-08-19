import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Pinned Status
export async function PATCH(req: NextRequest, { params }: { params: { todoId: string } }) {
    const { todoId } = params;
    const { pinnedStatus } = await req.json();

    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                isPinned: pinnedStatus
            }
        });
    
        return NextResponse.json(
            {
                data: todo,
                message: "Change pinned status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}