import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update Pinned Status
export async function PATCH(req: NextRequest, { params }: { params: { todoId: string } }) {
    const { todoId } = params;
    const { pinnedStatus } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoId,
                userId: session?.id
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
        console.log(error, "UPDATE_PINNED_TODO_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}