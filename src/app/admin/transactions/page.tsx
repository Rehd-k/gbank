import dbConnect from "@/libs/dbconnect";
import User from "../../../../model/user";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import transactions from "../../../../model/transactions";
import { Key } from "react";
import Link from "next/link";

export default async function Transactions() {
  await dbConnect();
  const users = await User.find()
    .select("username email cards")
    .populate("cards");
  return (
    <>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Checking Account</TableCell>
              <TableCell align="center">Savings Account</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((row: any, index: number) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="capitalize">{row.username}</TableCell>

                  <TableCell align="center">{row.email}</TableCell>

                  <TableCell align="center">
                    {row.cards.map((res: any, index: number) =>
                      res.type === "Checking Account" ? (
                        <div
                          className="p-2 border-gray-300 flex justify-between items-center  w-full h-full "
                          key={index}
                        >
                          {res.account_number} <Link href={`./transactions/${res.account_number}`}>View</Link>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {row.cards.map((res: any, index: number) =>
                      res.type === "Savings Account" ? (
                        <div
                          className="p-2 border-gray-300 flex justify-between items-center  w-full h-full "
                          key={index}
                        >
                          {res.account_number}{" "}
                          <Link href={`./transactions/${res.account_number}`}>View</Link>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </TableCell>

                  {/* <TableCell align="center">
                    {moment(row.date).format("MMM Do YY")}
                  </TableCell>

                  <TableCell align="center">{row.trx_id}</TableCell>

                  <TableCell align="center">{row.user.username}</TableCell> */}

                  {/* <TableCell align="center">
                    {row.approved ? (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          doUpdate(row);
                        }}
                      >
                        Disable
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          doUpdate(row);
                        }}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        doDelete(row);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
}
