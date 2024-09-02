import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Get Kanban By ID
export async function GET(req: Request, {params}: {params: {kanbanId: string}}) {
    const { kanbanId } = params;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
    
    try {        
        const kanban = await prisma.kanban.findUnique({
          where: {
            userId: session?.id,
            id: kanbanId
          },
        });
      
        return NextResponse.json({ data: kanban }, { status: 200 });
    } catch (error) {
        console.log(error, "GET_KANBAN_BY_ID_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500});
    }
}

// Edit Kanban
export async function PATCH(req: Request, {params}: {params: {kanbanId: string}}) {
  const { kanbanId } = params;
  const { title, priority, category } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  };

  try {
      const kanban = await prisma.kanban.update({
          where: {
              id: kanbanId,
              userId: session?.id
          },
          data: {
              title,
              priority,
              category
          }
      });

      return NextResponse.json({ data: kanban, message: "Kanban saved successfully"}, { status: 200 });
  } catch (error) {
      console.log(error, "EDIT_KANBAN_ERROR");
      return NextResponse.json("Internal Server Error", { status: 500});
  }
}

// Delete Kanban
export async function DELETE(req: Request, {params}: {params: {kanbanId: string}}) {
  const { kanbanId } = params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
      await prisma.kanban.delete({
          where: {
              userId: session?.id,
              id: kanbanId
          }
      });

      return NextResponse.json({ message: "Kanban deleted successfully"}, { status: 200 });
  } catch (error) {
      console.log(error, "DELETE_KANBAN_ERROR");
      return NextResponse.json("Internal Server Error", { status: 500});       
  }
}