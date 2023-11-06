import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../model/user";
import dbConnect from "@/libs/dbconnect";

export async function PUT(request: NextRequest) {
    await dbConnect()
    const body = await request.json();
    const userId = request.nextUrl.searchParams.get("id");

    const userUpdate = await User.findById(userId).populate('cards');

    for (const key in body) {
        if (userUpdate[key]) {
            userUpdate[key] = body[key]
        }
    }

    await userUpdate.save()

    return NextResponse.json({
        userUpdate
    })

}