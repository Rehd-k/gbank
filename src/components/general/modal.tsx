import { Modal, Box } from "@mui/material";
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined'

export default function Loader({ isOpen }: any) {
    return <>
        <Modal
            open={isOpen}
            // onClose={closeTransfers}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '50%',
                    md: '50%'
                },
                bgcolor: 'background.paper',
                px: 2,
                py: 4,
                borderRadius: 2
            }}>
                <div className="w-full flex justify-center">

                    <DataSaverOffOutlinedIcon className='animate-spin md:text-8xl text-4xl text-center text-blue-950 mx-auto' />
                </div>
            </Box>
        </Modal>
    </>
}