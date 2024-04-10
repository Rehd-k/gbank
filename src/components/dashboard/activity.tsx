'use client'
import { Paper } from '@mui/material'
import moment from 'moment'
export default function Activity({ transactions }: any) {

    
    function addCommas(number: { toString: () => any; }) {
        // Convert number to string
        var numberString = number.toString();

        // Regex to match groups of three digits
        var regex = /\B(?=(\d{3})+(?!\d))/g;

        // Add commas after every three digits
        return numberString.replace(regex, ",");
    }

    return (
        <div className="w-full mt-6">
            <Paper>
                <div className={` py-1 pl-2 text-gray-100 rounded-t-md text-xs ${transactions.destination === "Out" ? 'bg-red-700' : 'bg-green-700'}`}>
                    Posted on {moment(transactions.date).format("MMM Do YY")}
                </div>

                <div className="flex justify-between text-gray-800 text-xs mt-1 py-2 px-2 bg-gray-50">
                    <div className="">
                        {transactions.title}
                    </div>
                    <div className="">
                        ${addCommas(transactions.amount)}
                    </div>
                </div>
            </Paper>
        </div>

    )
}