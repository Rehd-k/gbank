import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import User from "../../../../model/user";
import UserComponentCard, { UserInterface } from "./components/userComponent";



export default async function Settings() {
    const session = await getServerSession(authOptions) as any
    const user: UserInterface = await User.findById(session?.user.id) as UserInterface
    return <>
        <UserComponentCard user={user} />
    </>
}