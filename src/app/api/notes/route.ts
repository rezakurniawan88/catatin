import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET Notes
export async function GET() {
    try {
        const notes = await prisma.note.findMany();

        return NextResponse.json(
            {
                data: notes
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}

// Create Note
export async function POST(req: Request) {
    const { title, content } = await req.json();

    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
            }
        });
    
        return NextResponse.json(
            {
                data: note,
                message: "Note created successfully."
            },
            {
                status: 201
            }
        );   
    } catch (error) {
        console.log(error);
    }
}