import dbConnect from "@/libs/dbconnect"
import AddAccountForm from "../components/addAccountForm"
import User from "../../../../model/user"

export default async function Accounts() {
    const users = await User.find({
        status: "confirmed"
    })
    const userString = JSON.stringify(users)
    return <>
        <AddAccountForm users={userString}></AddAccountForm>
    </>
}