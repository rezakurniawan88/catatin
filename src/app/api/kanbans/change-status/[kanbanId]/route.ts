import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update Kanban Status
export async function PATCH(req: NextRequest, { params }: { params: { kanbanId: string } }) {
    const { kanbanId } = params;
    const { newStatus } = await req.json();
    const session = await getServerSession(authOptions);
  
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
        const kanban = await prisma.kanban.update({
            where: {
                id: kanbanId,
                userId: session?.id
            },
            data: {
                status: newStatus
            }
        });
    
        return NextResponse.json({ data: kanban, message: "Kanban status updated successfully." }, { status: 200 });   
    } catch (error) {
        console.log(error, "UPDATE_KANBAN_STATUS_ERROR");
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
  }