import dbConnect from "@/libs/dbconnect"
import User from "../../../../model/user"
import UserComponent from "../components/users/users";


export default async function Users() {
    await dbConnect()
    const users = await User.find()
        .populate('cards')
    return <>
        <UserComponent users={JSON.stringify(users)} />
    </>
}