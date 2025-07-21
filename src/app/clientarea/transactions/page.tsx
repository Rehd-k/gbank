import Topcarosel from "@/components/dashboard/topcarosel";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbconnect";
import { getServerSession } from "next-auth";
import User from "../../../../model/user";
import TransactionComponent from "./transactionsCom";

export default async function Transactions() {
    await dbConnect()
    const session = await getServerSession(authOptions) as any
    const user = await User
        .findById(session?.user.id)
        .populate("cards")
        .populate("in")
        .populate("out");

    const inArray = JSON.stringify(user.in);
    const out = JSON.stringify(user.out)
    const accountString = JSON.stringify(user.cards)
    return <>
        <div className="mt-10">
            <TransactionComponent out={out} inArray={inArray} accounts={accountString} currency={user.currency ?? '$'} />
        </div>

    </>
}