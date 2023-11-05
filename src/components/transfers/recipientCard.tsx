'use client'
import { Box, Button, CircularProgress, FormControl, TextField, Modal } from "@mui/material";
import green from "@mui/material/colors/green";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import * as yup from 'yup';
import { useFormik } from "formik";
interface ChildProps {
    closeModal: Function
    doNewRecipient: Function
    userInfo: any
}

const validationSchema = yup.object({
    account_name: yup.string().required(),
    account_number: yup.number().required(),
    routing_number: yup.string(),
    bank_name: yup.string().required()
})

export default function RecipietCard(props: ChildProps) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setOpen(false)
        props.closeModal()
    };

    const updateRecipient = () => {
        setLoading(true)

        setTimeout(() => {
            openModal()
        }, 5000);
    }

    const formIk = useFormik({
        initialValues: {
            account_name: '',
            account_number: '',
            routing_number: '',
            bank_name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (props.userInfo.status === 'no Transfer') {
                updateRecipient()
            } else {
                props.doNewRecipient(values)
            }

        }
    })

    return (
        <>
            <form className="bg-white w-full rounded" onSubmit={formIk.handleSubmit}>
                <div className="mt-5">
                    <FormControl variant="standard" fullWidth>

                        <TextField
                            label="Account Name *"
                            variant="standard"
                            name="account_name"
                            value={formIk.values.account_name}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.account_name && Boolean(formIk.errors.account_name)}
                            helperText={formIk.touched.account_name && formIk.errors.account_name}
                        />
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="standard" fullWidth>

                        <TextField
                            label="Recipient Account Number *"
                            variant="standard"
                            type="number"
                            name="account_number"
                            value={formIk.values.account_number}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.account_number && Boolean(formIk.errors.account_number)}
                            helperText={formIk.touched.account_number && formIk.errors.account_number}
                        />
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="standard" fullWidth>

                        <TextField
                            label="Routing Name"
                            variant="standard"
                            name="routing_number"
                            value={formIk.values.routing_number}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.routing_number && Boolean(formIk.errors.routing_number)}
                            helperText={formIk.touched.routing_number && formIk.errors.routing_number}
                        />
                    </FormControl>
                </div>

                <div className="mt-5">
                    <FormControl variant="standard" fullWidth>

                        <TextField
                            label="Bank Name *"
                            variant="standard"
                            name="bank_name"
                            value={formIk.values.bank_name}
                            onChange={formIk.handleChange}
                            onBlur={formIk.handleBlur}
                            error={formIk.touched.bank_name && Boolean(formIk.errors.bank_name)}
                            helperText={formIk.touched.bank_name && formIk.errors.bank_name}
                        />
                    </FormControl>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-8">
                    <Box sx={{ position: 'relative', display: 'flex', width: '100%' }}>
                        <Button
                            variant="outlined"
                            disabled={loading}
                            fullWidth
                            sx={{ py: 1 }}
                            type="submit"
                        >
                            Add
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: { xs: '50%' },
                                    justifyContent: 'center',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>

                    <Button variant="outlined" sx={{ py: 1 }} color="warning" onClick={() => props.closeModal()} fullWidth>
                        Close
                    </Button>
                </div>

            </form>


            <Modal
                open={open}
                onClose={closeModal}
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
                        <CancelIcon sx={{
                            fontSize: {
                                xs: '100px'
                            },

                        }} />
                    </div>
                    <p className="text-center text-gray-600 text-xl mt-5">
                        Transfers to external Banks are not Avialable at the moment
                    </p>

                    <p className="text-xs text gray-600 text-center mt-1">
                        (Please contact our customer care here)
                    </p>
                    <div className="w-full flex justify-center mt-5">
                        <Button onClick={closeModal} variant="outlined" className="">Try again later</Button>
                    </div>
                </Box>
            </Modal>

            <ToastContainer />
        </>
    )
}