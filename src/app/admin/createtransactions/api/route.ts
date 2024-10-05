import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbconnect";
import Transaction from "../../../../../model/transactions";
import { customAlphabet } from 'nanoid';
import Card from "../../../../../model/card";
import User from "../../../../../model/user";
const nanoid = customAlphabet('1234567890', 10)

export async function POST(request: NextRequest) {
    const body = await request.json()

    await dbConnect()

    const transBody = {
        date: body.date,
        title: body.description,
        amount: body.amount,
        out: body.out,
        trx_id: nanoid(),
        destination: body.destination,
        from: body.account,
        user: body.user_id,
        to : body.accountNumber,
        approved: body.approved
    }

    const savedBody = await Transaction.create(transBody);

    if (!body.accountNumber) {
        const recpient = await Card.findOne({ account_number: body.account });
        if (recpient) {
            const curent_amount = Number(recpient.balance) + body.amount;
            recpient.balance = curent_amount;
            await recpient.save()
        }
    }


    if (body.accountNumber) {
        const account = await Card.findOne({ account_number: body.account });
        console.log(account.balance, body.account)
        const curent_amount = Number(account.balance) - body.amount;
        account.balance = curent_amount;

        if (body.accountNumber) {
            const recpient = await Card.findOne({ account_number: body.accountNumber });
            if (recpient) {
                const curent_amount = Number(recpient.balance) + body.amount;
                recpient.balance = curent_amount;
                await recpient.save()
            }
        }
        await account.save();
    }


    const user = await User.findById(body.user_id);
    if (body.destination === 'Out') {
        user.out.push(savedBody._id);
    }
    if (body.destination === 'In') {
        user.in.push(savedBody._id);
    }

    await user.save();

    return NextResponse.json({ savedBody }, { status: 200 });
}

export async function GET(request: NextRequest) {

    await dbConnect()
    const allTransactions = await Transaction.find()

    return NextResponse.json({
        allTransactions
    })
}


export async function PUT(request: NextRequest) {
    await dbConnect()
    const user_id = request.nextUrl.searchParams.get("id")!;
    const body = await request.json();
    const allTransactions = await Transaction.findById(user_id)
        .populate({ path: "user", select: "username" });

    allTransactions.approved = body.approved;
    console.log(body.approved)

    if (!body.approved) {
        const account = await Card.findOne({ account_number: body.from });
        const curent_amount = Number(account.balance) + body.amount;
        account.balance = curent_amount;

        if (body.to) {
            const recpient = await Card.findOne({ account_number: body.to });
            if (recpient) {
                const curent_amount = Number(recpient.balance) - body.amount;
                recpient.balance = curent_amount;
                await recpient.save()
            }
        }
        await account.save();
    }


    await allTransactions.save()




    return NextResponse.json({
        allTransactions
    })
}

export async function DELETE(request: NextRequest) {
    await dbConnect()
    const user_id = request.nextUrl.searchParams.get("id")!;

    await Transaction.findByIdAndDelete(user_id)

    return NextResponse.json({
        Done: 'Done'
    })

}