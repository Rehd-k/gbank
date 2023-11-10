'use client'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

interface TableData {
    _id: String,
    type: String,
    balance: number,
    account_number: number,
    user: String
}

export default function ViewAccounts({ accountList }: any) {



    const [accounts, setAccounts] = useState<TableData[]>(accountList)


    async function doDelete(res: any) {
        try {
            toast('Deleting...', {
                delay: 1,
                type: 'info',

            })
            await axios.delete(`/admin/accounts/api?id=${res._id}`)
            const index = accounts.findIndex((res => res._id))

            const newArray = [...accounts]
            newArray.splice(index, 1);
            setAccounts(newArray)

            accounts.splice(index)
            toast('Deleted', {
                delay: 1,
                type: 'success'
            })
        } catch (err: any) {
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
                            Type
                        </TableCell>

                        <TableCell align="right">
                            Balance
                        </TableCell>

                        <TableCell align="right">

                            Account Number

                        </TableCell>

                        <TableCell align="center">
                            Date
                        </TableCell>

                        <TableCell align="center">
                            User
                        </TableCell>

                        <TableCell align="center">

                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {accounts.map((row: any, index: number) => {
                        return <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell>
                                {row.type}
                            </TableCell>

                            <TableCell align="center">
                                {row.balance}
                            </TableCell>

                            <TableCell align="center">
                                {row.account_number}
                            </TableCell>

                            <TableCell align="center">
                                {row.user}
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