'use client'
import Loader from "@/components/general/modal";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

const getAccounts = async (value: string) => {
    const user = await axios.get(`/accounts/api?id=${value}`)
    if (user) {
        return user
    } else {
        return null
    }
}


const validationSchema = yup.object({
    destination: yup
        .string()
        .required('Please Select Destination'),
    amount: yup
        .number()
        .required("Select Amount")
        .min(0, "Amount must be greater than 0"),
    description: yup
        .string()
        .required('Please ADD a Description'),
    user_id: yup
        .string()
        .required("How far select user nah..."),
    date: yup
        .date()
        .required("Oga select date nahh"),
    account: yup
        .number()
        .required("Select account")
})


export default function CreateTransaction({ users }: any) {

    const [accounts, setAccounts] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [isOpen, setIsOpen] = useState(false);


    const formIk = useFormik({
        initialValues: {
            destination: '',
            amount: 0,
            description: '',
            user_id: '',
            date: null,
            account: 0,
            approved : true
        },
        validationSchema: validationSchema,
        onSubmit: async (value) => {
            await doTransfer(value)
        }
    })


    const doTransfer = async (value: any) => {
        try {
            toast("creating", {
                type: 'info'
            })
            await axios.post("/admin/transactions/api", value)
            toast('created', {
                type: 'success'
            })
        } catch (err: any) {
            toast(err.message, {
                type: 'error'
            })
        }
    }


    const getAccounts = async (value: any) => {
        setIsOpen(true)
        try {
            const accountsUrl = await axios.get(`/admin/accounts/api/?id=${value}`);
            setAccounts(accountsUrl.data.cards);
            setIsOpen(false)
            if (accountsUrl.data.cards.length  < 1) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return <>
        <form className="w-full pt-5 pb-10 px-5 rounded-md bg-gray-50 border border-blue-700 mt-5" onSubmit={formIk.handleSubmit}>
            <div className="">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>
                        Select User:
                    </InputLabel>
                    <Select
                        label="Select User :"
                        className="pl-1"
                        name="user_id"
                        value={formIk.values.user_id}
                        onBlur={formIk.handleBlur}
                        onChange={(e) => {
                            getAccounts(e.target.value)
                            return formIk.handleChange(e)
                        }}
                        error={formIk.touched.user_id && Boolean(formIk.errors.user_id)}
                    >
                        {users.map((res: any, index: number) => {
                            return <MenuItem key={index} value={res._id}>
                                {res.username}
                            </MenuItem>
                        })}

                    </Select>


                    <FormHelperText>
                        {formIk.touched.user_id && Boolean(formIk.errors.user_id)}
                    </FormHelperText>

                </FormControl>
            </div>


            <div className="mt-5">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>
                        Select Account:
                    </InputLabel>
                    <Select
                        label="Select Account:"
                        className="pl-1"
                        name="account"
                        type="number"
                        disabled={disabled}
                        value={formIk.values.account}
                        onBlur={formIk.handleBlur}
                        onChange={formIk.handleChange}
                        error={formIk.touched.account && Boolean(formIk.errors.account)}
                    >
                        {accounts.map((res: any, index: number) => {
                            return <MenuItem key={index} value={res.account_number} className="flex justify-between">
                                <div className="">
                                    {res.account_number}
                                </div>

                                <div>
                                    {res.type}
                                </div>
                            </MenuItem>

                        })}

                    </Select>


                    <FormHelperText>
                        {formIk.touched.account && Boolean(formIk.errors.account)}
                    </FormHelperText>

                </FormControl>
            </div>

            <div className="mt-5">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel >
                        Transfer Destination :
                    </InputLabel>
                    <Select
                        label="Transfer Destination"
                        name="destination"
                        value={formIk.values.destination}
                        onBlur={formIk.handleBlur}
                        onChange={formIk.handleChange}
                        error={formIk.touched.destination && Boolean(formIk.errors.destination)}
                    >
                        <MenuItem value={'Out'}>
                            Out
                        </MenuItem>
                        <MenuItem value={'In'}>
                            In
                        </MenuItem>

                    </Select>

                    <FormHelperText>
                        {formIk.touched.destination && formIk.errors.destination}
                    </FormHelperText>
                </FormControl>
            </div>




            <div className={`mt-5`}>
                <FormControl variant="standard" fullWidth>
                    <TextField
                        label="Date"
                        type="date"
                        name="date"
                        value={formIk.values.date}
                        onChange={formIk.handleChange}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.date && Boolean(formIk.errors.date)}
                        helperText={formIk.touched.date && formIk.errors.date}
                    />
                </FormControl>
            </div>

            <div className="mt-5">
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="standard-basic"
                        name="amount"
                        type="number"
                        label="Amount"
                        value={formIk.values.amount}
                        onChange={formIk.handleChange}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.amount && Boolean(formIk.errors.amount)}
                        helperText={formIk.touched.amount && formIk.errors.amount}
                    />
                </FormControl>
            </div>

            <div className="mt-5">
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="standard-basic"
                        name="description"
                        type="text"
                        label="Description"
                        value={formIk.values.description}
                        onChange={formIk.handleChange}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.description && Boolean(formIk.errors.description)}
                        helperText={formIk.touched.description && formIk.errors.description}
                    />
                </FormControl>
            </div>


            <div className="w-full flex justify-center mt-5">
                <Button variant="outlined" className="rounded-lg" type="submit">
                    Confirm
                </Button>
            </div>


        </form>

        <Loader isOpen={isOpen} />

        <ToastContainer />
    </>
}