
import { NextResponse, NextRequest } from "next/server";
import { customAlphabet } from 'nanoid';
import User from "../../../../model/user";
import dbConnect from "@/libs/dbconnect";

const nanoid = customAlphabet('1234567890', 10)

export async function GET(request: NextRequest) {
    let user;


    await dbConnect()
    // const emailParam = request.nextUrl.searchParams.get("email")!;

    // const usernameParam = request.nextUrl.searchParams.get("username")!;

    // console.log(emailParam, usernameParam)

    const users = await User.find()


    // if (emailParam) {
    //     const savedUser = await User.findOne({
    //         email: emailParam,

    //     })
    //     user = savedUser
    // } else if (usernameParam) {
    //     const savedUser = await User.findOne({
    //         where: {
    //             username: usernameParam,
    //         }
    //     })
    //     user = savedUser
    // }

    return NextResponse.json({ user: 'this text' });
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    try {
        const savedInfo = await User.create({
            account_Number: nanoid(),
            account_type: 'Savings',
            balance: 0,
            DOB: body.DOB,
            answer: body.answer,
            city: body.city,
            password: body.password,
            country: body.country_of_residence,
            email: body.email,
            firstName: body.firstName,
            first_address: body.first_address,
            gender: body.gender,
            id_card_number: body.id_card_number,
            id_card_type: body.id_card_type,
            lastName: body.lastName,
            middleName: body.middleName,
            mothers_maiden_name: body.mothers_maiden_name,
            nationality: body.nationality,
            occupation: body.occupation,
            phone_no: body.phone_no,
            second_address: body.second_address,
            securityQuestion: body.securityQuestion,
            username: body.username,
            zip_code: body.zip_code,
            state: body.state,
            status: 'processing'
        })

        return NextResponse.json(savedInfo);
    } catch (err) {
        throw new Error(err as string)
    }

}
