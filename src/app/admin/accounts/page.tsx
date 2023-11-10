import dbConnect from "@/libs/dbconnect"
import User from "../../../../model/user"
import Card from "../../../../model/card"
import AccountTabs from "./tabsHolder"

export default async function Accounts() {
    await dbConnect()
    const users = await User.find({
        status: "confirmed"
    })
    const accounts = await Card.find()

    const userString = JSON.stringify(users)
    const accountString = JSON.stringify(accounts)
    return <>
        <AccountTabs userString={userString} accountString={accountString} />
    </>
}