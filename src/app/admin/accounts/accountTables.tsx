'use client'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
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
    const [updatedPrice, setUpdatedPrice] = useState('')
    const [editable, makeEditable] = useState('')

    useEffect(() => {
        console.log(accountList)
    }, [])


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


    const doUpdate = async (res: any) => {
        toast('Updating...', {
            delay: 1,
            type: 'info',

        })

        const updated = await axios.put(`/admin/accounts/api?id=${res._id}`, {
            balance: updatedPrice
        })
        console.log(updated.data.cardUpdate)

        toast('Updated', {
            delay: 1,
            type: 'success'
        })

        makeEditable("")
    }

    const handleChange = async (e: any) => {
        const value = e.target.value
        console.log(value)
        setUpdatedPrice(value)
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
                            Owner
                        </TableCell>

                        <TableCell align="center">
                            Action
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
                                {
                                    editable == row.account_number ?
                                        <input className="w-full py-2 border pl-1" onChange={handleChange} />
                                        :
                                        <div>
                                            {
                                                row.balance
                                            }
                                        </div>
                                }


                            </TableCell>

                            <TableCell align="center">
                                {row.account_number}
                            </TableCell>

                            <TableCell align="center">
                                {row.user}
                            </TableCell>

                            <TableCell align="center">
                                <div className="flex justify-around">
                                    <Button variant="outlined" color="error">
                                        {
                                            editable == row.account_number ?
                                                <div onClick={() => { doUpdate(row) }}>
                                                    Done
                                                </div>

                                                :
                                                <div onClick={() => { makeEditable(row.account_number) }}>
                                                    Edit
                                                </div>
                                        }
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => { doDelete(row) }}>Delete</Button>

                                </div>

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </TableContainer>

        <ToastContainer />

    </>
}