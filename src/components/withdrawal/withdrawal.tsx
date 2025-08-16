'use client'
import { FormControl, TextField, Box, Button, CircularProgress, InputLabel, MenuItem, Select, Modal } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { CancelOutlined } from "@mui/icons-material";

export default function WithdrawalComponent() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const updateRecipient = () => {
        setLoading(true)

        setTimeout(() => {
            openModal()
        }, 5000);
        // toast("Saved")
    }
    return (
        <>
            <div className="bg-white w-full rounded">

                <div className="mt-10">
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Select Account:
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="destination"

                            className="pl-1"

                        >
                            <MenuItem value={'Internal'} className="flex justify-between">
                                <div className="">Max bird balance</div>

                                <div className="">€ 5000</div>

                            </MenuItem>
                            <MenuItem value={'External'}>
                                External Transfer
                            </MenuItem>

                        </Select>
                    </FormControl>
                </div>



                <div className="mt-10">
                    <FormControl variant="standard" fullWidth>

                        <TextField id="standard-basic" label="Amount" variant="standard" />
                    </FormControl>
                </div>

                <div className="mt-10">
                    <FormControl variant="standard" fullWidth>

                        <TextField id="standard-basic" label="Type" variant="standard" type="number" />
                    </FormControl>
                </div>



                <div className="w-full gap-5 mt-8">
                    <Box sx={{ position: 'relative', display: 'flex', width: '100%' }}>
                        <Button
                            variant="outlined"
                            disabled={loading}
                            fullWidth
                            sx={{ py: 1 }}
                            onClick={updateRecipient}

                        >
                            Makw Withdrawal
                        </Button>

                        {loading && (<CircularProgress
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
                        />)}
                    </Box>


                </div>

            </div>

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
                        <CancelOutlined sx={{
                            fontSize: {
                                xs: '100px'
                            },

                        }} />
                    </div>
                    <p className="text-center text-gray-600 text-xl mt-5">
                        Withdrawals are not Avialable at the moment
                    </p>

                    <p className="text-xs text gray-600 text-center mt-1">
                        (Please contact our customer care here)
                    </p>
                    <div className="w-full flex justify-center mt-5">
                        <Button onClick={closeModal} variant="outlined" className="">Try again later</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}