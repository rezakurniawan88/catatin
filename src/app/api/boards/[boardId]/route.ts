import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Get Board By ID
export async function GET(req: Request, {params}: {params: {boardId: string}}) {
    const { boardId } = params;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
    
    try {        
        const board = await prisma.board.findUnique({
          where: {
            userId: session?.id,
            id: boardId
          },
        });
      
        return NextResponse.json({ data: board }, { status: 200 });
    } catch (error) {
        console.log(error, "GET_BOARD_BY_ID_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}


// Save Changes Board
export async function PATCH(req: Request, {params}: {params: {boardId: string}}) {
    const { boardId } = params;
    const { snapshot } = await req.json();

    try {
        const board = await prisma.board.update({
            where: {
                id: boardId
            },
            data: {
                data: snapshot
            }
        });

        return NextResponse.json({ data: board, message: "Board saved successfully"}, { status: 200 });
    } catch (error) {
        console.log(error, "GET_BOARD_BY_ID_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Delete Board
export async function DELETE(req: Request, {params}: {params: {boardId: string}}) {
    const { boardId } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await prisma.board.delete({
            where: {
                userId: session?.id,
                id: boardId
            }
        });

        return NextResponse.json({ message: "Board deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error, "DELETE_BOARD_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});       
    }
}