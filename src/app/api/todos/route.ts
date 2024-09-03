import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TodoItemProps } from "@/types/todo-type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Get All Todos
export async function GET() {
    const session = await getServerSession(authOptions);
    const userId = session?.id;

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId
            },
            include: {
                todolist: true
            }
        });
        return NextResponse.json({ data: todos }, { status: 200});
    } catch (error) {
        console.log(error, "GET_ALL_TODOS_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Create todo
export async function POST(req: Request) {
    const { title, todos } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.id;

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                userId
            }
        });
        
        todos.map(async (todoItem: any) => {
            await prisma.todoList.create({
                data: {
                    title: todoItem,
                    todoId: todo.id
                }
            })
        });

        return NextResponse.json({
            message: "Todo created successfully",
            data: todo
        }, { status: 201 });
        
    } catch (error) {
        console.log(error, "CREATE_TODO_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Update Todo
export async function PUT(req: Request) {
    const { todoId, todoTitle, todolist } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.id;

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoId,
                userId
            },
            data: {
                title: todoTitle
            }
        });

        todolist.map(async (todoItem: TodoItemProps) => {
            await prisma.todoList.update({
                where: {
                    id: todoItem?.id,
                },
                data: {
                    title: todoItem?.title
                }
            })
        });

        return NextResponse.json({
            message: "Todo updated successfully",
            data: todo
        }, { status: 200 });
    } catch (error) {
        console.log(error, "UPDATE_TODO_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}