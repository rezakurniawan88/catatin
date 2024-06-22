import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get Note By ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const note = await prisma.note.findUnique({
            where: {
                id
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
        console.log(error);
    }
}

// Update Note
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { title, content } = await req.json();

    try {
        const note = await prisma.note.update({
            where: {
                id
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
        console.log(error);
    }
}

// Delete Note
export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;
    
    try {
        await prisma.note.delete({
            where: {
                id
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
        console.log(error);
        
    }
}