'use client'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
    Fade,
    Modal,
    Typography,
    FormHelperText
} from "@mui/material";
import { useState } from "react";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Loader from "../general/modal";

const extend = 'text-red-900 mt-5 h-full'
const contrast = 'h-0 overflow-hidden'
const validationSchema = yup.object({
    account: yup
        .string()
        .required('Please Select Sending Acount'),
    destination: yup
        .string()
        .required('Please Select Destination'),
    accountNumber: yup
        .number()
        .required("Please enter your Your Account Number"),
    accountName: yup
        .string()
        .required("Please Cross Check The Account Name"),
    frequency: yup
        .string()
        .required("Please Select The Frequency"),
    amount: yup
        .number()
        .required("Select Amount")
        .min(0, "Amount must be greater than 0"),
    swift_code: yup
        .string(),
    recipient: yup.string(),
    accountBalance: yup
        .number(),
    description: yup
        .string(),
    user_id: yup
        .string(),
    out: yup.string(),

    routing_number: yup.string(),

    bank_name: yup.string()
})


export default function TrasferCard({ cards, user_id, user }: any) {


    const [open, setOpen] = useState(false);
    const [openTransfers, setTransferOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const accounts = JSON.parse(cards)


    const closeTransfers = () => {
        setTransferOpen(false)
    }


    const formIk = useFormik({
        initialValues: {
            account: '',
            destination: 'Internal',
            accountNumber: 0,
            accountName: '',
            frequency: 'one_off',
            recipient: '',
            routing_number: '',
            swift_code: '',
            amount: 0,
            description: '',
            user_id: user_id,
            out: true,
            bank_name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (value) => {
            setIsOpen(true)
            await doTransfer(value)
        }
    })

    const doTransfer = async (value: {
        account: string;
        destination: string;
        accountNumber: number;
        accountName: string;
        frequency: string;
        amount: number;
        user_id: string;
        out: boolean
    }) => {
        value.destination = 'Out'
        await axios.post("/admin/transactions/api", value)
        setIsOpen(false)
        setTransferOpen(true)

        formIk.resetForm()
    }

    return (
        <>
            <form className="w-full pt-5 pb-10 px-5 rounded-md bg-gray-50 border border-blue-700 mt-5" onSubmit={formIk.handleSubmit}>
                <div className="">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>
                            Select Account:
                        </InputLabel>
                        <Select
                            label="Select Account"
                            className="pl-1"
                            name="account"
                            value={formIk.values.account}
                            onBlur={formIk.handleBlur}
                            onChange={formIk.handleChange}
                            error={formIk.touched.account && Boolean(formIk.errors.account)}
                        >
                            {accounts.map((res: any, index: number) => {
                                return <MenuItem key={index} value={res.account_number} className="flex justify-between">
                                    <div className="">{res.type}</div>

                                    <div className="">{res.account_number}</div>

                                    <div className="">$ {res.balance}</div>

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
                            <MenuItem value={'Internal'}>
                                Internal Transfer
                            </MenuItem>

                            <MenuItem value={'External'}>
                                External Transfer
                            </MenuItem>

                            <MenuItem value={'International'}>
                                International Transfer
                            </MenuItem>

                        </Select>

                        <FormHelperText>
                            {formIk.touched.destination && formIk.errors.destination}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className={`transition-all duration-300 ${formIk.values.destination === 'External' ? extend : contrast}`}>

                    <div className="mt-5">
                        <FormControl variant="outlined" fullWidth>

                            <TextField
                                label="Bank Name *"
                                variant="outlined"
                                name="bank_name"
                                value={formIk.values.bank_name}
                                onChange={formIk.handleChange}
                                onBlur={formIk.handleBlur}
                                error={formIk.touched.bank_name && Boolean(formIk.errors.bank_name)}
                                helperText={formIk.touched.bank_name && formIk.errors.bank_name}
                            />
                        </FormControl>
                    </div>

                    <div className="mt-5">
                        <FormControl variant="outlined" fullWidth>

                            <TextField
                                label="Routing Number"
                                variant="outlined"
                                name="routing_number"
                                value={formIk.values.routing_number}
                                onChange={formIk.handleChange}
                                onBlur={formIk.handleBlur}
                                error={formIk.touched.routing_number && Boolean(formIk.errors.routing_number)}
                                helperText={formIk.touched.routing_number && formIk.errors.routing_number}
                            />
                        </FormControl>
                    </div>
                </div>

                <div className={`transition-all duration-300 ${formIk.values.destination === 'International' ? extend : contrast}`}>

                    <div className="mt-5">
                        <FormControl variant="outlined" fullWidth>

                            <TextField
                                label="Bank Name *"
                                variant="outlined"
                                name="bank_name"
                                value={formIk.values.bank_name}
                                onChange={formIk.handleChange}
                                onBlur={formIk.handleBlur}
                                error={formIk.touched.bank_name && Boolean(formIk.errors.bank_name)}
                                helperText={formIk.touched.bank_name && formIk.errors.bank_name}
                            />
                        </FormControl>
                    </div>

                    <div className="mt-5">
                        <FormControl variant="outlined" fullWidth>

                            <TextField
                                label="Swift Code"
                                variant="outlined"
                                name="swift_code"
                                value={formIk.values.swift_code}
                                onChange={formIk.handleChange}
                                onBlur={formIk.handleBlur}
                                error={formIk.touched.swift_code && Boolean(formIk.errors.swift_code)}
                                helperText={formIk.touched.swift_code && formIk.errors.swift_code}
                            />
                        </FormControl>
                    </div>
                </div>



                <div className={'mt-5'}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            label="Recipient Account Number :"
                            type="number"
                            name="accountNumber"
                            value={formIk.values.accountNumber}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.accountNumber && Boolean(formIk.errors.accountNumber)}
                            helperText={formIk.touched.accountNumber && formIk.errors.accountNumber}
                        />
                    </FormControl>
                </div>

                <div className={`mt-5`}>
                    <FormControl variant="outlined" fullWidth>

                        <TextField id="standard-basic"
                            label="Account Name"
                            name="accountName"
                            value={formIk.values.accountName}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.accountName && Boolean(formIk.errors.accountName)}
                            helperText={formIk.touched.accountName && formIk.errors.accountName}
                        />
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>
                            Transfer Frequency :
                        </InputLabel>
                        <Select
                            label="Transfer Frequency"
                            name="frequency"
                            value={formIk.values.frequency}
                            onBlur={formIk.handleBlur}
                            onChange={formIk.handleChange}
                            error={formIk.touched.frequency && Boolean(formIk.errors.frequency)}
                        >
                            <MenuItem value='one_off'>
                                One Off
                            </MenuItem>
                            <MenuItem value='intervals'>
                                On Intervals
                            </MenuItem>
                            <MenuItem value='daily'>
                                Daily
                            </MenuItem>

                        </Select>
                    </FormControl>
                </div>

                <div className={`transition-all duration-300  ${formIk.values.frequency === 'one_off' ? contrast : extend}`}>
                    <div className="grid grid-cols-2 gap-5">
                        <FormControl variant="standard" fullWidth>
                            <TextField id="standard-basic" label="From" variant="standard" type="date" />
                        </FormControl>

                        <FormControl variant="standard" fullWidth>
                            <TextField id="standard-basic" label="To" variant="standard" type="date" />
                        </FormControl>
                    </div>

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
                        {`${formIk.values.frequency === 'one_off' ? 'Make' : 'Schedule'}`} a Transfer
                    </Button>
                </div>


            </form>





            <Modal
                open={openTransfers}
                onClose={closeTransfers}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '95%',
                        md: '50%'
                    },
                    bgcolor: 'background.paper',
                    px: 2,
                    py: 4,
                    borderRadius: 2
                }}>
                    <div className="w-full flex justify-center text-red-800">
                        <CheckCircleTwoToneIcon sx={{
                            fontSize: {
                                xs: '100px',
                                color: 'green'
                            },

                        }} />
                    </div>
                    <p className="text-center text-gray-600 text-xl mt-5">
                        Your transfer has been Scheduled
                    </p>

                    <p className="text-xs text gray-600 text-center mt-1">
                        (Your transactions will be processed within 24 hours and arrive destination account in 2-3 working days)
                    </p>
                    <div className="w-full flex justify-center mt-5">
                        <Button onClick={closeTransfers} variant="outlined" className="">OK</Button>
                    </div>
                </Box>
            </Modal>

            <Loader isOpen={isOpen} />

            <ToastContainer />
        </>
    )
}