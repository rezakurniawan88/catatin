import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Archives Status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { archivedStatus } = await req.json();

    try {
        const note = await prisma.note.update({
            where: {
                id
            },
            data: {
                isArchived: archivedStatus
            }
        });
    
        return NextResponse.json(
            {
                data: note,
                message: "Change archived status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}