'use client'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Backdrop,
    Box,
    Fade,
    Modal,
    Typography,
    FormHelperText
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import RecipietCard from "./recipientCard";
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
    recipient: yup.string(),
    accountBalance: yup
        .number(),
    description: yup
        .string(),
    user_id: yup
        .string(),
    out: yup.string()
})


export default function TrasferCard({ cards, user_id, user }: any) {


    const [open, setOpen] = useState(false);
    const [openTransfers, setTransferOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [newRecipient, setNewRecipient] = useState({
        account_name: ' ',
        account_number: 0,
        routing_number: '',
        bank_name: ''
    })
    const accounts = JSON.parse(cards)

    const doNewRecipient = (e: SetStateAction<{ account_name: string; account_number: number; routing_number: string; bank_name: string; }>) => {
        setNewRecipient(e)
        setOpen(false)
    }

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setOpen(false)
    };


    const closeTransfers = () => {
        setTransferOpen(false)
    }


    useEffect(() => {
        console.log(newRecipient)
    }, [open])

    const formIk = useFormik({
        initialValues: {
            account: '',
            destination: 'Internal',
            accountNumber: newRecipient.account_number,
            accountName: newRecipient.account_name,
            frequency: 'one_off',
            recipient: '',
            amount: 0,
            description: '',
            user_id: user_id,
            out: true,
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

                        </Select>

                        <FormHelperText>
                            {formIk.touched.destination && formIk.errors.destination}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className={`transition-all duration-300 ${formIk.values.destination === 'Internal' ? contrast : extend}`}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="">
                            Select Recipient :
                        </InputLabel>
                        <Select
                            label="Select Recipient"
                            name="recipient"
                            value={formIk.values.recipient}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                        >
                            {newRecipient.account_number === 0 ?

                                <MenuItem onClick={openModal} value={''}>
                                    Add Recipient
                                </MenuItem> :
                                <MenuItem className="flex justify-between" value={newRecipient.account_name}>
                                    <span>
                                        {
                                            newRecipient.account_name
                                        }
                                    </span>

                                    <span>
                                        {
                                            newRecipient.bank_name
                                        }
                                    </span>
                                </MenuItem>
                            }


                        </Select>

                        <FormHelperText>
                            {formIk.touched.accountNumber && formIk.errors.accountNumber}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            label="Recipient Account Number :"
                            type="number"
                            name="accountNumber"
                            disabled={formIk.values.destination === 'Internal' ? false : true}
                            value={formIk.values.destination === 'Internal' ? formIk.values.accountNumber : newRecipient.account_number}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.accountNumber && Boolean(formIk.errors.accountNumber)}
                            helperText={formIk.touched.accountNumber && formIk.errors.accountNumber}
                        />
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="outlined" fullWidth>

                        <TextField id="standard-basic"
                            label="Account Name"
                            name="accountName"
                            disabled={formIk.values.destination === 'Internal' ? false : true}
                            value={formIk.values.destination === 'Internal' ? formIk.values.accountName : newRecipient.account_name}
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
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={closeModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '95%',
                            md: '30%'
                        },
                        bgcolor: 'background.paper',
                        px: 2,
                        py: 4,
                        borderRadius: 2
                    }}>


                        <RecipietCard closeModal={closeModal} doNewRecipient={doNewRecipient} userInfo={user} />
                    </Box>
                </Fade>
            </Modal>



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
                        Your transfer was successful
                    </p>

                    <p className="text-xs text gray-600 text-center mt-1">
                        (For futher inquiry contact our suport team here)
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