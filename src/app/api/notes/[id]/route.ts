import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get Note By ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {
        const note = await prisma.note.findUnique({
            where: {
                id,
                userId: session?.id
            }
        });
    
        if (!note) {
            return NextResponse.json(
                {
                    message: "Note not found."
                },
                {
                    status: 404
                }
            );
        }
    
        return NextResponse.json(
            {
                data: note
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error, "GET_NOTE_BY_ID_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Update Note
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { title, content } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {
        const note = await prisma.note.update({
            where: {
                id,
                userId: session?.id
            },
            data: {
                title,
                content,
            }
        });
    
        return NextResponse.json(
            {
                data: note,
                message: "Note updated successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error, "UPDATE_NOTE_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Delete Note
export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
    
    try {
        await prisma.note.delete({
            where: {
                id,
                userId: session?.id
            }
        });
    
        return NextResponse.json(
            {
                message: "Note deleted successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error, "DELETE_NOTE_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}