import { FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Box, Button } from "@mui/material";
import { City } from "country-state-city";
import * as yup from 'yup';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/SendTwoTone';
import axios from "axios";

const checkEmailExists = async (value: string) => {
    const user = await axios.get(`/register/api?email=${value}`)
    if (user) {
        return user
    } else {
        return null
    }
}

const validationSchema = yup.object({
    first_address: yup
        .string()
        .required("Required"),
    second_address: yup
        .string(),
    city: yup
        .string()
        .required("Required"),
    zip_code: yup
        .string(),
    email: yup
        .string()
        .required("Required")
        .email('Please enter a Valid Email'),
        // .test('unique-email', 'Email already exists', async function (value) {
        //     if (!value) return true;
        //     try {
        //         const emailExists = await checkEmailExists(value);
               
        //         if (emailExists?.data.user) {
        //             return false
        //         } else {
        //             return true;
        //         }
                
        //     } catch (error) {
        //         console.error(error);
        //         return false;
        //     }
        // }),,
    phone_no: yup
        .string()
        .required("Required")
})



export default function RegStepThree({ moveFront, moveBack, index }: any) {

    const formIk = useFormik({
        initialValues: {
            first_address: '',
            second_address: '',
            city: '',
            zip_code: '',
            email: '',
            phone_no: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("stepThree", JSON.stringify(values))
        }
    })


    function doSaveFrom() {
        formIk.submitForm()
    }

    const country_code = localStorage.getItem('chosen_country_code')!
    const state_code = localStorage.getItem('chosen_state_code')!

    return <>
        <form className="px-2" onSubmit={formIk.handleSubmit}>
            <h1 className="text-gray-600 font-semibold mt-5 text-sm">Your Contact Info</h1>
            <p className="text-gray-600 mt-2 text-xs">and Now your Contact Info</p>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    label="Address Line 1"
                    type="text"
                    name="first_address"
                    placeholder="Address Line 1 (No P.O oxes, please)"

                    value={formIk.values.first_address}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.first_address && Boolean(formIk.errors.first_address)}
                    helperText={formIk.touched.first_address && formIk.errors.first_address}
                />
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    label="Address Line 2"

                    type="text"
                    name="second_address"

                    placeholder="Address Line 2 (Optional)"


                    value={formIk.values.second_address}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.second_address && Boolean(formIk.errors.second_address)}
                    helperText={formIk.touched.second_address && formIk.errors.second_address}
                />
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <InputLabel > City *</InputLabel>
                <Select
                   
                    label="City *"
                    name="city"


                    value={formIk.values.city}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.city && Boolean(formIk.errors.city)}

                >
                    {
                        City.getCitiesOfState(country_code, state_code).map((res, index) => <MenuItem key={index} value={res.name}>{res.name}</MenuItem>)

                    }
                </Select>


                <FormHelperText>
                    {
                        formIk.touched.city && formIk.errors.city
                    }
                </FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    label="Zip Code"
                    type="text"
                    name="zip_code"
                    placeholder="Zip Code"

                    value={formIk.values.zip_code}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.zip_code && Boolean(formIk.errors.zip_code)}
                    helperText={formIk.touched.zip_code && formIk.errors.zip_code}
                />
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"

                    value={formIk.values.email}
                    onBlur={formIk.handleBlur}
                    onChange={formIk.handleChange}
                    error={formIk.touched.email && Boolean(formIk.errors.email)}
                    helperText={formIk.touched.email && formIk.errors.email}
                />

            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    label="Phone Number"
                    type="tel"
                    name="phone_no"
                    placeholder="Phone Number"


                    value={formIk.values.phone_no}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.phone_no && Boolean(formIk.errors.phone_no)}
                    helperText={formIk.touched.phone_no && formIk.errors.phone_no}
                />
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


    </>
}