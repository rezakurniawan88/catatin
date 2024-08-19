import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, todoId } = await req.json();
    
    try {
        const todolist = await prisma.todoList.create({
            data: {
                title,
                todoId
            }
        });

        return NextResponse.json({ data: todolist, message: "Todo created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error, "CREATE_TODOLIST_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}