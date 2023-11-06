import dbConnect from "@/libs/dbconnect";
import User from "../../../../model/user";
import TransactionsTabs from "../components/transactionTab";
import Transaction from "../../../../model/transactions";

export default async function Transactions() {
    await dbConnect()
    const users = await User
        .find()
        .select("username")
    const transactions = await Transaction
        .find()
        .populate({path : "user", select : "username"})

    const usersList = JSON.stringify(users);
    const transactionList = JSON.stringify(transactions)

    return <>
        <TransactionsTabs usersList={usersList} transactionList={transactionList} />
    </>
}