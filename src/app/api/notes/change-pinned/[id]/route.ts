import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Pinned Status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { pinnedStatus } = await req.json();

    try {
        const note = await prisma.note.update({
            where: {
                id
            },
            data: {
                isPinned: pinnedStatus
            }
        });
    
        return NextResponse.json(
            {
                data: note,
                message: "Change pinned status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}