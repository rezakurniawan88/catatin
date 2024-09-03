import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET All Notes
export async function GET() {
    const session = await getServerSession(authOptions);
    const userId = session?.id;
    if (!userId) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 });
    }
    try {
        const notes = await prisma.note.findMany({
            where: {
                userId
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            }
        });

        return NextResponse.json({ data: notes }, { status: 200 });   
    } catch (error) {
        console.log(error, "GET_ALL_NOTES_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Create Note
export async function POST(req: Request) {
    const { title, content } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.id;

    if (!userId) {
        return NextResponse.json({message: 'Unauthorized'}, { status: 401 });
    }

    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId
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
        console.log(error, "CREATE_NOTE_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}