import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbconnect";
import Card from "../../../../../model/card";
import User from "../../../../../model/user";

export async function POST(request: NextRequest) {
    await dbConnect()
    const body = await request.json()

    const account = await Card.create(body);

    const user = await User.findById(body.user);

    user.cards.push(account._id);

    await user.save()

    return NextResponse.json({ account }, { status: 200 });
}