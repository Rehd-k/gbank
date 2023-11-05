import HourglassFullTwoTone from "@mui/icons-material/HourglassFullTwoTone";

export default function RegSubmission() {
    return <div className="flex justify-center items-center">

        <div className="mt-16 md:mt-0">
            <div className="w-48 h-48 mx-auto rounded-full border-gray-600 border-4 flex justify-center items-center text-7xl">
                <HourglassFullTwoTone fontSize={'inherit'} className="animate-pulse" />
            </div>

            <div className="text-center font-semibold text-gray-600 text-xs md:text-xs md:w-1/2 w-4/6 mx-auto mt-4">
                Your Application have been Submitted and is being proccessed, You will be notified when the process is complete. Thank You
            </div>
        </div>

    </div>
}