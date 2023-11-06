import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import User from "../../../../model/user";
import UserComponentCard, { UserInterface } from "./components/userComponent";
import dbConnect from "@/libs/dbconnect";



export default async function Settings() {
    await dbConnect()
    const session = await getServerSession(authOptions) as any
    const user: UserInterface = await User.findById(session?.user.id) as UserInterface
    return <>
        <UserComponentCard user={user} />
    </>
}