'use client'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { customAlphabet } from "nanoid"
const nanoid = customAlphabet("0123456789", 10)

const validationSchema = yup.object({
    balance: yup
        .number()
        .required("Required"),
    type: yup
        .string()
        .required("Required"),
    account_number: yup
        .string()
        .required("Required"),
    user: yup
        .string()
        .required("Required")
})

export default function AddAccountForm({ users }: any) {

    const usersMap = JSON.parse(users)

    const formIk = useFormik({
        initialValues: {
            balance: '',
            type: '',
            account_number: nanoid(),
            user: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            
            const account = await axios.post("/admin/accounts/api", values);
            
        }
    })


    return <>
        <form onSubmit={formIk.handleSubmit} className="px-2 md:px-0">

            <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                <TextField
                    id="outlined-basic"
                    label="Account Number *"
                    variant="outlined"
                    type="number"
                    name="account_number"
                    aria-readonly={true}
                    value={formIk.values.account_number}
                    disabled
                />
            </FormControl>


            <FormControl
                sx={{ marginTop: 5, minWidth: 120 }}
                className="w-full"
            >
                <Select
                    onChange={formIk.handleChange}
                    name="type"
                    onBlur={formIk.handleBlur}
                    label="Account Type *"
                    value={formIk.values.type}
                    error={formIk.touched.type && Boolean(formIk.errors.type)}
                >

                    <MenuItem value={'Savings Account'}>Savings Account</MenuItem>
                    <MenuItem value={'Checking Account'}>Checking Account</MenuItem>


                </Select>
                <InputLabel>Account Type *</InputLabel>

                <FormHelperText>
                    {formIk.touched.type && formIk.errors.type}
                </FormHelperText>
            </FormControl>


            <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                <TextField
                    id="outlined-basic"
                    label="Balance *"
                    variant="outlined"
                    type="number"
                    name="balance"
                    value={formIk.values.balance}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.balance && Boolean(formIk.errors.balance)}
                    helperText={formIk.touched.balance && formIk.errors.balance}


                />
            </FormControl>


            <FormControl
                sx={{ marginTop: 5, minWidth: 120 }}
                className="w-full"
            >
                <Select
                    onChange={formIk.handleChange}
                    name="user"
                    onBlur={formIk.handleBlur}
                    label="User *"
                    value={formIk.values.user}
                    error={formIk.touched.user && Boolean(formIk.errors.user)}
                >
                    {usersMap.map((res: any, index: number) => {
                        return <MenuItem key={index} value={res._id}>{res.username}</MenuItem>
                    })}

                </Select>
                <InputLabel>User *</InputLabel>

                <FormHelperText>
                    {formIk.touched.user && formIk.errors.user}
                </FormHelperText>
            </FormControl>

            <button className="block w-full bg-[#4f0d56] mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
                Login
            </button>

        </form>
    </>
}