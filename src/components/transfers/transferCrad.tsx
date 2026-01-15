averonAveron'use client'
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
import { useRouter } from 'next/navigation';
import { Close } from "@mui/icons-material";

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
    const { replace } = useRouter();
    const [dest, setDestination] = useState('');
    const [openTransfers, setTransferOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSuspended, setIsSuspended] = useState(false);

    const accounts = JSON.parse(cards)


    const closeTransfers = () => {
        formIk.resetForm()
        setTransferOpen(false)
        replace('/clientarea/dashboard')
    }

    const closeSuspended = () => {
        setIsSuspended(false)

    }




    const formIk = useFormik({
        initialValues: {
            account: '',
            destination: 'Internal',
            accountNumber: 0,
            accountName: '',
            frequency: 'One Off',
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
            switch (user.status) {
                case "suspened":
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                        setIsSuspended(true)
                    }, 2000);
                
                    break;
                case "confirmed":
                    setIsOpen(true)
                    await doTransfer(value)
                    break;
                case "no Transfer":
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                        setIsSuspended(true)
                    }, 2000);
                    
                    break;

                case "restricted":
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 2000);
                    await checkInternal(value)
                    break;

                default:
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                        setIsSuspended(true)
                    }, 2000);
                    
                    break;
            }

        }
    })

    const checkInternal = async (transaction: any) => {
        if (transaction.destination !== 'Internal') {
            setIsSuspended(true)
        } else {
            setIsOpen(true)
            await doTransfer(transaction)
        }
    }

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
        setDestination(formIk.values.destination)
        value.destination = 'Out'
        await axios.post("/admin/createtransactions/api", value)
        setIsOpen(false)
        setTransferOpen(true)


    }


    function addCommas(number: { toString: () => any; }) {
        // Convert number to string
        var numberString = number.toString();

        // Regex to match groups of three digits
        var regex = /\B(?=(\d{3})+(?!\d))/g;

        // Add commas after every three digits
        return numberString.replace(regex, ",");
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

                                    <div className="">€ {addCommas(res.balance)}</div>

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
                            <MenuItem value='One Off'>
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

                <div className={`transition-all duration-300  ${formIk.values.frequency === 'One Off' ? contrast : extend}`}>
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
                        {`${formIk.values.frequency === 'One Off' ? 'Make' : 'Schedule'}`} a Transfer
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

                    <div className="">
                        {dest != 'Internal' ?
                            <div className="flex justify-between w-full mt-5">
                                <div className="">
                                    Bank Name :
                                </div>
                                <div className="">
                                    {formIk.values.bank_name}
                                </div>
                            </div> : ''
                        }

                        {dest == 'External' ?
                            <div className="flex justify-between w-full mt-2">
                                <div className="">
                                    Routing Number :
                                </div>
                                <div className="">
                                    {formIk.values.routing_number}
                                </div>
                            </div> : ''}
                        {dest == 'International' ?
                            <div className="flex justify-between w-full mt-2">
                                <div className="">
                                    Swift Code :
                                </div>
                                <div className="">
                                    {formIk.values.swift_code}
                                </div>

                            </div> : ''
                        }


                        < div className="flex justify-between w-full mt-2">
                            <div className="">
                                Account Number :
                            </div>
                            <div className="">
                                {formIk.values.accountNumber}
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-2">
                            <div className="">
                                Account Name :
                            </div>
                            <div className="">
                                {formIk.values.accountName}
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-2">
                            <div className="">
                                Frequency :
                            </div>
                            <div className="">
                                {formIk.values.frequency}
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-2">
                            <div className="">
                                Amount :
                            </div>
                            <div className="">
                                €{addCommas(formIk.values.amount)}
                            </div>
                        </div>

                        <div className="flex justify-between w-full mt-2">
                            <div className="">
                                Description :
                            </div>
                            <div className="md:w-1/2 w-4/5">
                                {formIk.values.description}
                            </div>

                        </div>
                    </div>

                    <p className="text-xs text gray-600 text-center mt-5">
                        (Your transactions will be processed within 24 hours and arrive destination account in 2-3 working days)
                    </p>
                    <div className="w-full flex justify-center mt-5">
                        <Button onClick={closeTransfers} variant="outlined" className="">OK</Button>
                    </div>
                </Box>
            </Modal >

            <Modal
                open={isSuspended}
                onClose={closeSuspended}
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
                    <div className="w-40 h-40 text-4xl rounded-full bg-red-800 border border-gray-900 mx-auto flex justify-center items-center">
                        <Close className="w-1/2 h-1/2 text-gray-200" fontSize="inherit" />
                    </div>

                    <div className="text-center text-3xl mt-5">
                        Not Allowed
                    </div>

                    {user.status === "suspened" ?
                        <div className="mt-5 text-sm text-center">
                            You can not perform transactions on a suspended account.
                        </div>
                        : user.status === "restricted" ?
                            <div className="mt-5 text-sm text-center">
                                This account is restricted and only transfers to other Nebula Trust Bank accounts can be processed.
                            </div>
                            :

                            <div className="mt-5 text-sm text-center">
                                This oparation is not allowed on this account please contact support for assistance.
                            </div>

                    }

                </Box>
            </Modal>

            <Loader isOpen={isOpen} />

            <ToastContainer />
        </>
    )
}