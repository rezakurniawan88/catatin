import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update Favorite Status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { favoriteStatus } = await req.json();

    try {
        const note = await prisma.note.update({
            where: {
                id
            },
            data: {
                isFavorite: favoriteStatus
            }
        });
    
        return NextResponse.json(
            {
                data: note,
                message: "Change favorite status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}