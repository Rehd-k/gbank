'use client'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

interface TableData {
    _id: String
    date: Date,
    title: String,
    amount: String,
    user: { username: String },
    destination: String,
    trx_id: String,
    approved: boolean,
}

export default function ViewTransaction({ transaction }: any) {



    const [transactions, setTransactions] = useState<TableData[]>(transaction)


    async function doUpdate(res: TableData) {
        if (res.approved) {
            res.approved = false
        } else {
            res.approved = true
        }
        try {
            toast('Updateing...', {
                delay: 1,
                type: 'info',

            })
            const newUpdate = await axios.put(`/admin/transactions/api?id=${res._id}`, res)
            const index = transactions.findIndex((res => res._id))
            const newArray = [...transactions]
            newArray[index] = newUpdate.data.allTransactions;
            setTransactions(newArray)

            toast('Updated', {
                delay: 1,
                type: 'success'
            })
        } catch (err: any) {
            toast(err.message, {
                type: 'error'
            })
        }
    }


    async function doDelete(res: any) {
        try {
            toast('Deleting...', {
                delay: 1,
                type: 'info',

            })
            await axios.delete(`/admin/transactions/api?id=${res._id}`)
            const index = transactions.findIndex((res => res._id))

            const newArray = [...transactions]
            newArray.splice(index, 1);
            setTransactions(newArray)

            transactions.splice(index)
            toast('Deleted', {
                delay: 1,
                type: 'success'
            })
        } catch (err : any) {
            toast(err.message, {
                type: 'error'
            })
        }
    }



    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Title
                        </TableCell>

                        <TableCell align="right">
                            Destination
                        </TableCell>

                        <TableCell align="right">
                            Amount
                        </TableCell>

                        <TableCell align="center">
                            Date
                        </TableCell>

                        <TableCell align="center">
                            Trans Id
                        </TableCell>

                        <TableCell align="right">
                            User
                        </TableCell>

                        <TableCell align="center">
                            Status
                        </TableCell>

                        <TableCell align="center">

                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((row: any, index: number) => {
                        return <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell>
                                {row.title}
                            </TableCell>

                            <TableCell align="center">
                                {row.destination}
                            </TableCell>

                            <TableCell align="center">
                                {row.amount}
                            </TableCell>

                            <TableCell align="center">
                                {moment(row.date).format("MMM Do YY")}
                            </TableCell>

                            <TableCell align="center">
                                {row.trx_id}
                            </TableCell>

                            <TableCell align="center">
                                {row.user.username}
                            </TableCell>

                            <TableCell align="center">
                                {
                                    row.approved ?
                                        <Button variant="outlined" onClick={() => { doUpdate(row) }}>Disable</Button>
                                        :
                                        <Button variant="outlined" onClick={() => { doUpdate(row) }}>Approve</Button>
                                }
                            </TableCell>

                            <TableCell align="center">

                                <Button variant="outlined" color="error" onClick={() => { doDelete(row) }}>Delete</Button>

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </TableContainer>

        <ToastContainer />

    </>
}