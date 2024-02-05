import { FormControl, InputLabel, Select, MenuItem, TextField, Box, Button, FormHelperText } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/SendTwoTone';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('Your First Name is required'),
    middleName: yup
        .string()
        .required('Your MIddle Name is required'),
    lastName: yup
        .string()
        .required('Your Last, Name is required'),
    gender: yup
        .string()
        .required("Required"),
    id_card_type: yup
        .string()
        .required("Select Card Type"),
    id_card_number: yup
        .string()
        .required("Required"),
    DOB: yup
        .string()
        .required("Required"),
    mothers_maiden_name: yup
        .string()
        .required("Required")

})

export default function RegStepTwo({ moveFront, moveBack, index }: any) {

    const formIk = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            id_card_type: '',
            id_card_number: '',
            DOB: '',
            mothers_maiden_name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("stepTwo", JSON.stringify(values))
        }
    })

    function doSaveFrom() {
        formIk.submitForm()
    }

    return <form className="bg-white px-2" onSubmit={formIk.handleSubmit}>
        <h1 className="text-gray-600 font-semibold mt-5 text-sm">Your Personal Info</h1>
        <p className="text-gray-600 mt-2 text-xs">Now your Personal Info</p>
        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <TextField
                className="outline-none border-none"
                type="text"
                name="firstName"
                label="First Name *"
                value={formIk.values.firstName}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.firstName && Boolean(formIk.errors.firstName)}
                helperText={formIk.touched.firstName && formIk.errors.firstName}
            />
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <TextField
                className="outline-none border-none"
                type="text"
                name="middleName"
                id=""
                label="Middle Name *"

                value={formIk.values.middleName}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.middleName && Boolean(formIk.errors.middleName)}
                helperText={formIk.touched.middleName && formIk.errors.middleName}
            />
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">

            <TextField
                className="outline-none border-none"
                type="text"
                name=""
                id="lastName"
                label="Last Name *"

                value={formIk.values.lastName}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.lastName && Boolean(formIk.errors.lastName)}
                helperText={formIk.touched.lastName && formIk.errors.lastName}
            />
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <InputLabel>Gender</InputLabel>
            <Select
                name="gender"
                label="Gender *"
                value={formIk.values.gender}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.gender && Boolean(formIk.errors.gender)}
            >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
            </Select>

            <FormHelperText>
                {formIk.touched.gender && formIk.errors.gender}
            </FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <InputLabel>ID card Type *</InputLabel>
            <Select
                type="text"
                name="id_card_type"
                id=""
                label="ID card Type *"

                value={formIk.values.id_card_type}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.id_card_type && Boolean(formIk.errors.id_card_type)}
            >
                <MenuItem value={'driver license '}>Driver License </MenuItem>
                <MenuItem value={'passport'}>Passport</MenuItem>
                <MenuItem value={'government issued id'}>Government Issued ID</MenuItem>
            </Select>

            <FormHelperText>
                {formIk.touched.id_card_type && formIk.errors.id_card_type}
            </FormHelperText>
        </FormControl>




        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <TextField
                className="outline-none border-none"
                type="text"
                name="id_card_number"
                id=""
                label="ID card Number *"

                value={formIk.values.id_card_number}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.id_card_number && Boolean(formIk.errors.id_card_number)}
                helperText={formIk.touched.id_card_number && formIk.errors.id_card_number}
            />
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <TextField
                type="date"
                name="DOB"
                label="Date of Birth *"

                value={formIk.values.DOB}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.DOB && Boolean(formIk.errors.DOB)}
                helperText={formIk.touched.DOB && formIk.errors.DOB}
            />
        </FormControl>

        <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
            <TextField
                className="outline-none border-none"
                type="text"
                name="mothers_maiden_name"
                id=""
                label="Mother's Maiden Name (Last Name)"

                value={formIk.values.mothers_maiden_name}
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                error={formIk.touched.mothers_maiden_name && Boolean(formIk.errors.mothers_maiden_name)}
                helperText={formIk.touched.mothers_maiden_name && formIk.errors.mothers_maiden_name} />
        </FormControl>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
            <Button
                color="inherit"
                disabled={index === 0}
                onClick={moveBack}
                sx={{ mr: 1 }}
                variant="outlined"
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
                onClick={() => {
                    doSaveFrom()
                    moveFront()
                }}
                variant="contained"
                endIcon={<SendIcon />}
                disabled={formIk.dirty ? !formIk.isValid : true}
            >
                Next
            </Button>
        </Box>
    </form>
}