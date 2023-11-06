'use client'
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import RegStepOne from "./regsteps/step1"
import RegStepTwo from "./regsteps/step2"
import RegStepThree from "./regsteps/step3"
import RegStepFour from "./regsteps/step4"
import RegSubmission from "./regsteps/regsubmission"
import { Box, Stepper, Step, StepLabel } from "@mui/material"

export default function RegisterCom() {

    const [processing, setProccessing] = useState(false)

    const checkIfUserIsConfirmed = async (user_email: string) => {
        try {
            const user = await axios.get(`/register/api?email=${user_email}`)

            if (user.data.user.status === "processing") {
                setProccessing(true)
            }
        } catch (err) { }
    }

    useEffect(() => {
        const user_email = localStorage.getItem("user_email");

        if (user_email) {
            checkIfUserIsConfirmed(user_email)
        }

    }, [])


    const doToast = (e: string) => toast(e)
    const [activeStep, setActiveStep] = useState(0);



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const checkServer = async () => {
        const newUser = await axios.get('/register/api')

        console.log(newUser)
    }

    async function doSubmit() {
        const stepone = JSON.parse(localStorage.getItem("stepOne")!)
        const steptwo = JSON.parse(localStorage.getItem("stepTwo")!)
        const stepthree = JSON.parse(localStorage.getItem("stepThree")!)
        const stepfour = JSON.parse(localStorage.getItem("stepFour")!)

        const user = {
            ...stepone,
            ...steptwo,
            ...stepthree,
            ...stepfour
        }

        try {
            doToast("Submitting Your Application...")
            const newUser = await axios.post('/register/api', user)
            if (newUser) {
                localStorage.removeItem("stepOne")
                localStorage.removeItem("stepTwo")
                localStorage.removeItem("stepThree")
                localStorage.removeItem("stepFour")
                localStorage.removeItem("chosen_country_code")
                localStorage.removeItem("chosen_state_code")
                localStorage.setItem("user_email", newUser.data.email)
            }
            location.reload()
        } catch (error) {
            doToast(error as string)
        }
    }

    const steps = [
        {
            label: 'Genaral Info',
            component: <RegStepOne moveFront={handleNext} moveBack={handleBack} index={0} />
        },
        {
            label: 'Personal Info',
            component: <RegStepTwo moveFront={handleNext} moveBack={handleBack} index={1} />
        },
        {
            label: 'Contact Info',
            component: <RegStepThree moveFront={handleNext} moveBack={handleBack} index={2} />
        },
        {
            label: 'Security',
            component: <RegStepFour moveFront={doSubmit} moveBack={handleBack} index={3} />
        }];



    return (
        <>

            <div className="h-10 w-full bg-green-900" onClick={checkServer}>
                do the kin check
            </div>
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
                {
                    processing ?
                        <RegSubmission />
                        :
                        <div className="mx-auto md:w-10/12 justify-center py-10 items-center bg-white md:px-0">
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label, index) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: {
                                            optional?: React.ReactNode;
                                        } = {};
                                        return (
                                            <Step key={index} {...stepProps}>
                                                <StepLabel {...labelProps}>{label.label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <>
                                    <div className="mt-5">
                                        {steps[activeStep].component}
                                    </div>


                                    <Link className="text-xs ml-2 hover:text-blue-500 cursor-pointer text-gray-600 pt-4" href={"/login"}>Already Have Account ?</Link>
                                </>
                            </Box>


                            <ToastContainer />
                        </div>

                }







            </div>
        </>
    )
}