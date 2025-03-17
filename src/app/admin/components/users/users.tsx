'use client'
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ButtonGroup
} from "@mui/material"
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

interface userInterface {

    _id?: string;
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    savings_account_balance?: number,
    checking_account_balance?: number,
    date_of_brith?: Date,
    nationality?: string,
    country?: string,
    state?: string,
    phone_no?: number,
    city?: string,
    email?: string,
    status?: string,
    cards?: any,
    createdOn?: number
}

export default function UserComponent({ users }: any) {

    const userParse = JSON.parse(users)
    const [user, setUser] = useState<userInterface[]>(userParse);
    const [filteredUsers, setFilteredUser] = useState<userInterface[]>(user);

    async function doUpdate(res: userInterface) {

        try {
            toast('Updateing...', {
                delay: 1,
                type: 'info',
            })
            const newUpdate = await axios.put(`/admin/users/api?id=${res._id}`, res)
            const index = user.findIndex((res => res._id))
            const newArray = [...user]
            newArray[index] = newUpdate.data.userUpdate;
            setUser(newArray)
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

    async function doDelete(res: userInterface) {
        try {
            toast('Deleting...', {
                delay: 1,
                type: 'info',
            })

            await axios.delete(`/admin/users/api?id=${res._id}`)

            toast('Deleted', {
                delay: 1,
                type: 'success',
            })
        } catch (err: any) {
            toast(err.message, {
                type: 'error'
            })
        }
    }

    function searchUsers(query: string) {
        const lowerCaseQuery = query.toLowerCase();
        const filteredUsers = user.filter((u) => {
            return (
                (u.firstName && u.firstName.toLowerCase().includes(lowerCaseQuery)) ||
                (u.lastName && u.lastName.toLowerCase().includes(lowerCaseQuery)) ||
                (u.username && u.username.toLowerCase().includes(lowerCaseQuery)) ||
                (u.email && u.email.toLowerCase().includes(lowerCaseQuery)) ||
                (u.nationality && u.nationality.toLowerCase().includes(lowerCaseQuery)) ||
                (u.country && u.country.toLowerCase().includes(lowerCaseQuery)) ||
                (u.state && u.state.toLowerCase().includes(lowerCaseQuery)) ||
                (u.city && u.city.toLowerCase().includes(lowerCaseQuery)) ||
                (u.status && u.status.toLowerCase().includes(lowerCaseQuery))
            );
        });
        setFilteredUser(filteredUsers);
    }

    return <>
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search users..."
                onChange={(e) => searchUsers(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box'
                }}
            />
        </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Last Name
                        </TableCell>

                        <TableCell>
                            First Name
                        </TableCell>

                        <TableCell>
                            Username
                        </TableCell>

                        <TableCell align="right">
                            Password
                        </TableCell>

                        <TableCell align="right">
                            Savings Account Balance
                        </TableCell>

                        <TableCell align="center">
                            Checking Account Balance
                        </TableCell>

                        <TableCell align="center">
                            Nationality
                        </TableCell>

                        <TableCell align="right">
                            Country Of Residence
                        </TableCell>

                        <TableCell align="center">
                            State
                        </TableCell>

                        <TableCell align="center">
                            Phone Number
                        </TableCell>

                        <TableCell align="center">
                            City
                        </TableCell>

                        <TableCell align="center">
                            Email
                        </TableCell>

                        <TableCell align="center">
                            Status
                        </TableCell>

                        <TableCell align="center">
                            Joined Since
                        </TableCell>

                        <TableCell align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filteredUsers.map((row: userInterface, index: number) => {
                        return <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell>
                                {row.firstName}
                            </TableCell>

                            <TableCell>
                                {row.lastName}
                            </TableCell>


                            <TableCell>
                                {row.username}
                            </TableCell>

                            <TableCell align="center">
                                {row.password}
                            </TableCell>

                            <TableCell align="center">
                                {
                                    row.cards.map((res: { type: string; balance: number }) => {
                                        if (res.type === 'Savings Account') {
                                            return res.balance
                                        }
                                    })
                                }
                            </TableCell>

                            <TableCell align="center">
                                {
                                    row.cards.map((res: { type: string; balance: number }) => {
                                        if (res.type === 'Checking Account') {
                                            return res.balance
                                        }
                                    })
                                }
                            </TableCell>

                            <TableCell align="center">
                                {row.nationality}
                            </TableCell>

                            <TableCell align="center">
                                {row.country}
                            </TableCell>

                            <TableCell align="center">
                                {row.state}
                            </TableCell>


                            <TableCell align="center">
                                {row.phone_no}
                            </TableCell>


                            <TableCell align="center">
                                {row.city}
                            </TableCell>


                            <TableCell align="center">
                                {row.email}
                            </TableCell>


                            <TableCell align="center">
                                {row.status}
                            </TableCell>

                            <TableCell align="center">
                                {moment(row.createdOn).format('DD/MM/YYYY')}
                            </TableCell>

                            <TableCell align="center">
                                <ButtonGroup
                                    orientation="vertical"
                                >
                                    <Button color="info" onClick={() => {
                                        doUpdate(
                                            {

                                                _id: row._id,
                                                status: 'confirmed'
                                            }
                                        )
                                    }}

                                    >confirm</Button>
                                    <Button color="success"
                                        onClick={() => {
                                            doUpdate(
                                                {

                                                    _id: row._id,
                                                    status: 'blocked'
                                                }
                                            )
                                        }}>Block</Button>
                                    <Button color="info" onClick={() => {
                                        doUpdate(
                                            {

                                                _id: row._id,
                                                status: 'no Transfer'
                                            }
                                        )
                                    }}
                                    >Stop Transfer</Button>

                                    <Button color="error"
                                        onClick={() => {
                                            doUpdate(
                                                {

                                                    _id: row._id,
                                                    status: 'suspened'
                                                }
                                            )
                                        }}
                                    >suspend</Button>

                                    <Button color="error"
                                        onClick={() => {
                                            doUpdate(
                                                {

                                                    _id: row._id,
                                                    status: 'restricted'
                                                }
                                            )
                                        }}
                                    >Restricted</Button>

                                    <Button color="error"
                                        onClick={() => {
                                            doUpdate(
                                                {

                                                    _id: row._id,
                                                    status: 'closed'
                                                }
                                            )
                                        }}
                                    >Closed</Button>

                                    <Button color="error"
                                        onClick={() => {
                                            doDelete(
                                                {

                                                    _id: row._id,
                                                    status: 'closed'
                                                }
                                            )
                                        }}
                                    >Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </TableContainer>

    </>
}