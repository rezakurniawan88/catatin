import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update Archives Status
export async function PATCH(req: NextRequest, { params }: { params: { boardId: string } }) {
    const { boardId } = params;
    const { archivedStatus } = await req.json();
    const session = await getServerSession(authOptions);

    if(!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const board = await prisma.board.update({
            where: {
                id: boardId,
                userId: session?.id
            },
            data: {
                isArchived: archivedStatus
            }
        });
    
        return NextResponse.json(
            {
                data: board,
                message: "Change archived status successfully."
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error, "ARCHIVED_BOARD_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});   
    }
}