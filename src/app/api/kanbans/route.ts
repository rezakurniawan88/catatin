import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

// Get All Kanbans
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {        
        const kanban = await prisma.kanban.findMany({
          where: {
            userId: session?.id,
          },
        });
      
        return NextResponse.json({ data: kanban }, { status: 200 });
    } catch (error) {
        console.log(error, "GET_KANBANS_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }

}

// Create Kanban
export async function POST(req: Request) {
    const { title, priority, category } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    try {
        const kanban = await prisma.kanban.create({
            data: {
                title,
                priority,
                category,
                userId: session?.id
            }
        })
    
        return NextResponse.json({data: kanban, message: "Kanban created successfully"}, { status: 201 });
    } catch (error) {
        console.log(error, "CREATE_KANBAN_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }

}