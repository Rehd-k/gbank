import dbConnect from "@/libs/dbconnect";
import User from "../../../../model/user";
import TransactionsTabs from "../components/transactionTab";
import Transaction from "../../../../model/transactions";
import CreateTransaction from "../components/transactionscom/createTransaction";

export default async function CreateTransactions() {
    await dbConnect()
    const users = await User
        .find()
        .select("username")

    const usersList = JSON.stringify(users);
 

    return <>
        {/* <TransactionsTabs usersList={} transactionList={transactionList} /> */}
        <CreateTransaction users={usersList} />
    </>
}