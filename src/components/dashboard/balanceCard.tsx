'use client'
export default function BalanceCards({ props } : any) {
    return (
        <div className="bg-gray-100 w-full rounded">
            <div className="bg-[#4f0d56] rounded-t flex items-center h-14 text-gray-50 pl-5">
                Account Balance
            </div>

            <div className="px-2 py-2">
                <div className="border-b border-gray-300 py-1 text-gray-500 font-bold">
                    $ {props.balance}
                </div>

                <div className="flex justify-between border-b border-gray-300 py-1.5 text-gray-500 text-xs md:text-sm">
                    <div className="">
                        Current Balance
                    </div>

                    <div className="">
                        $ {props.balance}
                    </div>
                </div>

                <div className="flex justify-between border-b border-gray-300 py-1.5 text-gray-500 text-xs md:text-sm">
                    <div className="">
                        Account Type
                    </div>

                    <div className="">
                        {props.type}
                    </div>
                </div>

                <div className="flex justify-between pt-1.5 pb-2.5 text-gray-500 text-xs md:text-sm font-bold">
                    <div className="">
                        Account number
                    </div>

                    <div className="">
                        {props.account_number}
                    </div>
                </div>
            </div>
        </div>
    )
}