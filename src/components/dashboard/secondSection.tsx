averonAveron'use client'
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import Button from '@mui/material/Button';
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined';


export default function SecondSection() {
    return (
        <>
            <div className="border-t-4 border-[#4f0d56] rounded-md w-full bg-gray-50 mt-10 shadow px-5 py-5">
                <div className="w-full flex justify-center">
                    <HourglassFullTwoToneIcon />
                </div>

                <div className="text-sm text-gray-600 font-bold py-4">
                    Recurring payment made easy
                </div>

                <div className="text-gray-600 text-xs">
                    Perform your routine funds transfer and bill payment in just 1-tap, when you set up recurring transfers or bill payment with Nebula Trust
                </div>

                <div className="mt-5 w-full flex justify-center">
                    <Button variant="outlined" size="medium" style={{
                        borderRadius: 100,
                        backgroundColor: "",
                        color: 'blue',
                        borderColor: 'blue'
                    }}>
                        Get Started
                    </Button>
                </div>
            </div>
        </>
    )
}