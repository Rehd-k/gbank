import dbConnect from "@/libs/dbconnect";
import ViewTransaction from "../../components/transactionscom/viewtransactions";
import Transaction from "../../../../../model/transactions";

export default async function TransactionAccounts({
  params,
}: {
  params: { accountNumber: number };
}) {
  await dbConnect();


  const trans = await Transaction.find({ from: params.accountNumber });
  return (
    <>
      <ViewTransaction transaction={JSON.stringify(trans)} />
    </>
  );
}
