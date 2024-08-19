import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Archives Status
export async function PATCH(req: NextRequest, { params }: { params: { todoId: string } }) {
    const { todoId } = params;
    const { archivedStatus } = await req.json();

    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                isArchived: archivedStatus
            }
        });
    
        return NextResponse.json(
            {
                data: todo,
                message: "Change archived status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}