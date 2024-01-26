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

export async function DELETE(request: NextRequest) {
    await dbConnect()
    const card_id = request.nextUrl.searchParams.get("id")!;

    await Card.findByIdAndDelete(card_id)

    return NextResponse.json({
        Done: 'Done'
    })

}

export async function GET(request: NextRequest) {
    await dbConnect()
    let cards = []
    const card_id = request.nextUrl.searchParams.get("id")!;
    if (card_id) {
        cards = await Card.find({
            user: card_id
        })
    } else {
        cards = await Card.find();
    }
    return NextResponse.json({
        cards
    })
}


export async function PUT(request: NextRequest) {
    await dbConnect()
    const body = await request.json();
    console.log(body)
    const cardId = request.nextUrl.searchParams.get("id");

    const cardUpdate = await Card.findById(cardId)

    for (const key in body) {
        if (cardUpdate[key]) {
            cardUpdate[key] = body[key]
        }
    }

    await cardUpdate.save()

    return NextResponse.json({
        cardUpdate
    })
}