import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get All Users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                notes: true
            }
        });

        return NextResponse.json(
            {
                data: users
            },
            {
                status: 200
            }
        );   
    } catch (error) {
        console.log(error);
    }
}