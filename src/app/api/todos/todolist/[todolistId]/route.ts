import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { todolistId: string } }) {
    const { todolistId } = params;
    const { checkStatus } = await req.json();

    try {
        const todolist = await prisma.todoList.update({
            where: {
                id: todolistId
            },
            data: {
                completed: checkStatus
            }
        });

        return NextResponse.json({ data: todolist, message: "Change checklist successfully."}, { status: 200 });
    } catch (error) {
        console.log(error, "CHANGE_STATUS_TODOLIST_ERROR");
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { todolistId: string } }) {
    const { todolistId } = params;
    try {
        await prisma.todoList.delete({
            where: {
                id: todolistId
            }
        });

        return NextResponse.json({ message: "Delete todolist successfully."}, { status: 200 });
    } catch (error) {
        console.log(error, "DELETE_TODOLIST_ERROR");
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });       
    }
}