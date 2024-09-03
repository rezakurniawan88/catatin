import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update Pinned Status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { pinnedStatus } = await req.json();
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
        console.log(error, "UPDATE_PINNED_NOTE_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}