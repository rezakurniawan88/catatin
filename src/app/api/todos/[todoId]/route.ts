import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete Todo
export async function DELETE(req: NextRequest, {params}: {params: {todoId: string}}) {
    const { todoId } = params;
    
    try {
        await prisma.todo.delete({
            where: {
                id: todoId
            }
        });
    
        return NextResponse.json({ message: "Todo deleted successfully."}, { status: 200 });   
    } catch (error) {
        console.log(error);
        
    }
}