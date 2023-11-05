import { Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import LockOpen from "@mui/icons-material/LockOpen";
import * as yup from 'yup'
import axios from "axios";
import { useFormik } from "formik";
import SendIcon from '@mui/icons-material/SendTwoTone'


const securityQuestions = [
    "What was the name of your first pet?",
    "In what city were you born?",
    "What is your mother's maiden name?",
    "What is the name of your favorite book?",
    "What is your favorite food?",
    "What was the make and model of your first car?",
    "What is the name of your favorite teacher?",
    "What is the last name of your best childhood friend?",
    "What is the name of the street you grew up on?",
    "What is the first name of your oldest cousin?",
];

const checkEmailExists = async (value: string) => {
    const user = await axios.get(`/register/api?username=${value}`)
    if (user) {
        return user
    } else {
        return null
    }
}


const validationSchema = yup.object({
    securityQuestion: yup
        .string()
        .required('Required'),
    password: yup
        .string()
        .required('Required')
        .min(6, 'Password must be longer than 6'),

    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required("Required"),

    username: yup
        .string()
        .required('Required')
        // .test('unique-username', 'Username already exists', async function (value) {
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
        // })
        ,


    answer: yup
        .string()
        .required()

})
export default function RegStepFour({ moveFront, moveBack, index }: any) {

    const [passType, setType] = useState('password');

    const doSetType = () => {
        if (passType === 'password') {
            setType('text')
        } else if (passType === 'text') {
            setType('password')
        }
    }

    const formIk = useFormik({
        initialValues: {
            securityQuestion: '',
            password: '',
            username: '',
            confirm_password: '',
            answer: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("stepFour", JSON.stringify(values))
        }
    })


    function doSaveFrom() {
        formIk.submitForm()
    }
    return <>

        <form className="px-2" onSubmit={formIk.handleSubmit}>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    name="username"
                    placeholder="User Name"
                    autoComplete="false"
                    value={formIk.values.username}
                    onBlur={formIk.handleBlur}
                    onChange={formIk.handleChange}
                    error={formIk.touched.username && Boolean(formIk.errors.username)}
                    helperText={formIk.touched.username && formIk.errors.username}
                />
            </FormControl>


            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {
                                    passType === 'password' ? <LockIcon onClick={doSetType} /> : <LockOpen onClick={doSetType} />
                                }

                            </InputAdornment>)
                    }}
                    type={passType}
                    name="password"
                    label="Password"
                    placeholder="********"

                    value={formIk.values.password}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.password && Boolean(formIk.errors.password)}
                    helperText={formIk.touched.password && formIk.errors.password}
                />
            </FormControl>


            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {
                                    passType === 'password' ? <LockIcon onClick={() => { setType('password') }} /> : <LockOpen onClick={() => { setType('text') }} />
                                }

                            </InputAdornment>)
                    }}
                    type={passType}
                    name="confirm_password"
                    placeholder="********"
                    label="Confirm Password"

                    value={formIk.values.confirm_password}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.confirm_password && Boolean(formIk.errors.confirm_password)}
                    helperText={formIk.touched.confirm_password && formIk.errors.confirm_password}
                />
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <InputLabel id="simple-standard">Security Question *</InputLabel>
                <Select
                    name="securityQuestion"
                    label="Security Question *"
                    value={formIk.values.securityQuestion}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.securityQuestion && Boolean(formIk.errors.securityQuestion)}
                >
                    {securityQuestions.map((res, index) => {
                        return <MenuItem key={index} value={res}>{res}</MenuItem>
                    })

                    }
                </Select>

                <FormHelperText>
                    {formIk.touched.securityQuestion && formIk.errors.securityQuestion}
                </FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                <TextField
                    name="answer"
                    id="answer"
                    label="Security Answer"


                    value={formIk.values.answer}
                    onChange={formIk.handleChange}
                    onBlur={formIk.handleBlur}
                    error={formIk.touched.answer && Boolean(formIk.errors.answer)}
                    helperText={formIk.touched.answer && formIk.errors.answer}
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
                        setTimeout(() => {
                            moveFront()
                        }, 1000);

                    }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={formIk.dirty ? !formIk.isValid : true}
                >
                    Finish & Submit
                </Button>
            </Box>
        </form>
    </>
}