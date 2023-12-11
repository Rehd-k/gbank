'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from "formik";
import { Box, FormControl, InputAdornment, Modal, TextField } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpen from "@mui/icons-material/LockOpen";
import router, { Router } from "next/router";
import axios from "axios";
import RegSubmission from "../register/regsteps/regsubmission";


const validationSchema = yup.object({
    username: yup
        .string()
        .required('Required'),
    password: yup
        .string()
        .required('Required')
        .min(6, 'Password must be longer than 6'),
})


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LoginCom() {
    const [passType, setPassType] = useState("password")
    const [openModel, setOpenModal] = useState(false)
    const [securityQuestion, setSecurityQuestion] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [answer, setAnswer] = useState("")
    const [values, setValues] = useState<any>(null)

    const [processing, setProccessing] = useState(false)

    const checkIfUserIsConfirmed = async (user_email: string) => {
        try {
            const user = await axios.get(`/register/api?email=${user_email}`)

            if (user.data.user.status === "processing") {
                setProccessing(true)
            }
        } catch (err) { }
    }


    const formIk = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setValues(values)
            try {
                toast("Checking ...", { type: 'info' })
                const user = await axios.get(`/register/api?username=${values.username}`)
                if (user.data.user) {
                    if (
                        user.data.user.password === values.password
                    ) {
                        setSecurityQuestion(user.data.user.securityQuestion);
                        setCorrectAnswer(user.data.user.answer)
                        setOpenModal(true)
                    } else {
                        toast("Password and Username Does Not Match")

                    }
                } else {
                    toast("Username Does Not Exist")
                }

            } catch (err) {
                toast(err as string, { type: 'error' })
            }
        }
    });
    const checkQuestion = () => {
        if (correctAnswer !== answer) {
            toast('Incorrect Try again!')
            window.location.replace('clientarea/dashboard')
        } else {
            toast('Logging You in...')
            login(values)
        }
    }



    const login = (values: { username: any; password: any; }) => {
        console.log(values);
        signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
        }).then((res) => {
            if (res!.error) {
                toast(res?.error as string, { type: 'error' })
            } else {
                toast("logged in", { type: "success" })
                window.location.replace('clientarea/dashboard')
            }
        })
    }

    useEffect(() => {
        const user_email = localStorage.getItem("user_email");

        if (user_email) {
            checkIfUserIsConfirmed(user_email)
        }

    }, [])


    const setType = () => {
        if (passType === 'password') {
            setPassType('text')
        } else {
            setPassType('password')
        }
    }
    return (
        <>
            {processing ?
                <RegSubmission />
                :
                <div className="h-screen md:grid md:grid-cols-2">
                    <div
                        className="relative overflow-hidden md:flex w-full bg-gradient-to-tr from-[#4f0d56] to-purple-800 i justify-around items-center">
                        <div className="py-10 md:py-0">
                            <Image
                                src="/wp-content/themes/chelseagroton-2023/public/images/logo_transparent.png"
                                alt="Nebula Trust Bank Logo"
                                width={200}
                                height={200}
                                className="mx-auto rounded">
                            </Image>
                            <h1 className="text-white font-bold text-4xl font-sans text-center md:text-left mt-5">Nebula Trust Bank</h1>
                            <p className="text-white text-center md:text-left mt-2">Global Financial Institution</p>
                            <Link href={'/'}>
                                <button className="block w-28 bg-white text-indigo-800  mt-6 py-2 rounded-2xl font-bold mb-2 mx-auto md:mx-0">Home</button>
                            </Link>
                        </div>
                        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 hidden md:block"></div>
                        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 hidden md:block"></div>
                        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 "></div>
                        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    </div>


                    <div className="mx-auto md:w-1/2 justify-center py-10 items-center bg-white px-2 md:px-0">
                        <form className="bg-white" onSubmit={formIk.handleSubmit}>
                            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center md:text-left">Hello Again!</h1>
                            <p className="text-sm font-normal text-gray-600 mb-7 text-center md:text-left">Welcome Back</p>



                            <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                                <TextField
                                    id="username"
                                    label="Usename"
                                    variant="outlined"
                                    type="text"
                                    name="username"
                                    value={formIk.values.username}
                                    onChange={formIk.handleChange}
                                    onBlur={formIk.handleBlur}
                                    error={formIk.touched.username && Boolean(formIk.errors.username)}
                                    helperText={formIk.touched.username && formIk.errors.username}
                                />
                            </FormControl>



                            <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                                <TextField

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{
                                                cursor: "pointer"
                                            }}>
                                                {
                                                    passType === 'password' ? <LockIcon onClick={setType} /> : <LockOpen onClick={setType} />
                                                }

                                            </InputAdornment>)
                                    }}


                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type={passType}
                                    name="password"
                                    value={formIk.values.password}
                                    onChange={formIk.handleChange}
                                    onBlur={formIk.handleBlur}
                                    error={formIk.touched.password && Boolean(formIk.errors.password)}
                                    helperText={formIk.touched.password && formIk.errors.password}
                                />
                            </FormControl>

                            <button className="block w-full bg-[#4f0d56] mt-4 py-2 rounded-2xl text-white font-semibold mb-2" type="submit">
                                Login
                            </button>
                            <Link className="md:text-sm text-xs ml-2 hover:text-blue-500 cursor-pointer" href={""}>Forgot Password ?</Link>
                            <br />
                            <Link href={"register"} className="md:text-sm text-xs ml-2">Dont have An Account ?</Link>
                        </form>
                    </div>
                </div>


            }
            <Modal
                open={openModel}
                onClose={() => setOpenModal(false)}
            >
                <Box sx={style}>
                    <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                        <TextField
                            name="SecurityQuestion"
                            id="SecurityQuestion"
                            label="Security Question"
                            value={securityQuestion}
                            disabled
                        />
                    </FormControl>

                    <FormControl sx={{ marginTop: 2, minWidth: 120 }} className="w-full">
                        <TextField
                            name="answer"
                            id="answer"
                            label="Security Answer"
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </FormControl>



                    <div className="pt-10 flex justify-around">
                        <button onClick={() => setOpenModal(false)}>
                            Close
                        </button>


                        <button onClick={checkQuestion}>
                            Check
                        </button>
                    </div>
                </Box>
            </Modal>
            <ToastContainer />
        </>
    )
}