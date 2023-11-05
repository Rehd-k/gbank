import Activities from "@/components/dashboard/activities";
import SecondSection from "@/components/dashboard/secondSection";
import Topcarosel from "@/components/dashboard/topcarosel";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import User from "../../../../model/user";


export default async function dahsboard() {
    const session = await getServerSession(authOptions) as any
    const user = await User
        .findById(session?.user.id)
        .populate("cards")
        .populate("in")
        .populate("out");

    const inArray = JSON.stringify(user.in);
    const out = JSON.stringify(user.out)
    const accountString = JSON.stringify(user.cards)
    return (
        <div className="w-full">
            <Topcarosel accounts={accountString} />

            <SecondSection />


            <Activities inArray={inArray} out={out} />

        </div>

    )
}