import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

// Get All Boards
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {        
        const boards = await prisma.board.findMany({
          where: {
            userId: session?.id,
          },
        });
      
        return NextResponse.json({ data: boards }, { status: 200 });
    } catch (error) {
        console.log(error, "GET_BOARDS_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }

}

// Create Board
export async function POST(req: Request) {
    const { title } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {
        const board = await prisma.board.create({
            data: {
                title,
                data: {},
                userId: session?.id
            }
        })
    
        return NextResponse.json({data: board, message: "Board created successfully"}, { status: 201 });
    } catch (error) {
        console.log(error, "CREATE_BOARD_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }

}