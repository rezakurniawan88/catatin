import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Delete Todo
export async function DELETE(req: NextRequest, {params}: {params: {todoId: string}}) {
    const { todoId } = params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        await prisma.todo.delete({
            where: {
                id: todoId,
                userId: session?.id
            }
        });
    
        return NextResponse.json({ message: "Todo deleted successfully."}, { status: 200 });   
    } catch (error) {
        console.log(error, "DELETE_TODO_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});       
    }
}