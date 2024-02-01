import TrasferCard from "@/components/transfers/transferCrad";
import dbConnect from "@/libs/dbconnect";
import Card from "../../../../model/card";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import User from "../../../../model/user";


export default async function Transfers() {
    await dbConnect()
    const session = await getServerSession(authOptions) as any
  
    const cards = await Card.find({
        user : session?.user.id
    });
    const user = await JSON.parse(JSON.stringify(await User.findById(session?.user.id).select('status',)))
    

    const cardString = JSON.stringify(cards)
    return (
        <>
            <div className="text-xl font-bold text-center text-gray-500 mt-5">
                Make A Transfer
            </div>

            <TrasferCard cards={cardString} user_id={session?.user.id} user={user} />

        </>
    )
}