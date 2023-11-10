import { Button, Paper } from "@mui/material";
import moment from "moment";

export interface UserInterface {
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    id_card_type: String,
    id_card_number: String,
    DOB: string,
    mothers_maiden_name: String;
    first_address: String,
    second_address: String,
    city: String,
    zip_code: String,
    email: String,
    phone_no: String,
    securityQuestion: String,
    password: String,
    username: String,
    answer: String,
    country: String,
    state: String,
    occupation: String,
    nationality: String
}


export default function UserComponentCard({ user }: any) {
    return <>
        <Paper
            sx={{
                py: 3,
                pl: {
                    md: 3
                }
            }}>
            <div className="text-center text-gray-700 font-bold text-xs md:text-sm pb-5">
                Personal Information
            </div>

            <div className="text-xs md:text-md px-2">
                <div className="grid md:grid-cols-3 grid-cols-2">
                    <div className="">
                        <p className="font-bold">
                            Last Name
                        </p>
                        <div className="pt-0.5">{user.lastName}</div>
                    </div>

                    <div className="">
                        <p className="font-bold">
                            First Name
                        </p>
                        <div className="pt-0.5">{user.firstName}</div>
                    </div>

                    <div className="col-span-2 md:col-span-1 mt-2 md:mt-0">
                        <p className="font-bold">
                            MIddle Name
                        </p>
                        <div className="pt-0.5">{user.middleName}</div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">

                    <div className="">
                        <p className="font-bold">
                            Date Of Birth
                        </p>
                        <div className="pt-0.5">{moment(user.DOB).format("MMM Do YY")}</div>
                    </div>

                    <div className="">
                        <p className="font-bold">
                            Sex
                        </p>
                        <div className="pt-0.5">{user.gender}</div>
                    </div>

                    <div className="mt-2 md:mt-0">
                        <p className="font-bold">
                            ID Card
                        </p>
                        <div className="pt-0.5">{user.id_card_type}</div>
                    </div>


                    <div className="mt-2 md:mt-5">
                        <p className="font-bold">
                            ID Card Number
                        </p>
                        <div className="pt-0.5">{user.id_card_number}</div>
                    </div>


                </div>
            </div>

            <div className="w-full flex justify-center pt-5">
                <Button variant="outlined" size="large">
                    Edit
                </Button>
            </div>
        </Paper>


        <Paper
            sx={{
                py: 3,
                pl: {
                    md: 3
                },
                mt: 5
            }}>
            <div className="text-center text-gray-700 font-bold text-xs md:text-sm pb-5">
                Contact Information
            </div>

            <div className="text-xs md:text-md px-2">
                <div className="grid md:grid-cols-3 grid-cols-2">
                    <div className="">
                        <p className="font-bold">
                            Email
                        </p>
                        <div className="pt-0.5">{user.email}</div>
                    </div>

                    <div className="">
                        <p className="font-bold">
                            Phone Number
                        </p>
                        <div className="pt-0.5">{user.phone_no}</div>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <p className="font-bold">
                            Zip Code
                        </p>
                        <div className="pt-0.5">{user.zip_code}</div>
                    </div>

                    <div className="mt-4">
                        <p className="font-bold">
                            Address
                        </p>
                        <div className="pt-0.5">{user.first_address}</div>
                    </div>

                    <div className={user.second_address ? 'block mt-4' : 'hidden'}>
                        <p className="font-bold">
                            Althernative Address
                        </p>
                        <div className="pt-0.5">{user.second_address}</div>
                    </div>

                    <div className="mt-4">
                        <p className="font-bold">
                            City
                        </p>
                        <div className="pt-0.5">{user.city}</div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center pt-5">
                <Button variant="outlined" size="large">
                    Edit
                </Button>
            </div>
        </Paper>


        <Paper
            sx={{
                py: 3,
                pl: {
                    md: 3
                },
                mt: 5
            }}>
            <div className="text-center text-gray-700 font-bold text-xs md:text-sm pb-5">
                General Information
            </div>

            <div className="text-xs md:text-md px-2">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
                    <div className="">
                        <p className="font-bold">
                            Country Of Residence
                        </p>
                        <div className="pt-0.5">{user.country}</div>
                    </div>

                    <div className="">
                        <p className="font-bold">
                            Country Of Origin
                        </p>
                        <div className="pt-0.5">{user.nationality}</div>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <p className="font-bold">
                            Residential State
                        </p>
                        <div className="pt-0.5">{user.state}</div>
                    </div>

                    <div className="mt-4">
                        <p className="font-bold">
                            Occupation
                        </p>
                        <div className="pt-1"> {user.occupation} </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center pt-5">
                <Button variant="outlined" size="large">
                    Edit
                </Button>
            </div>
        </Paper>


        <Paper
            sx={{
                py: 3,
                pl: {
                    md: 3
                },
                mt: 5
            }}>
            <div className="text-center text-gray-700 font-bold text-xs md:text-sm pb-5">
                Security
            </div>

            <div className="text-xs md:text-md px-2">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
                    <div className="">
                        <p className="font-bold">
                            Security Question
                        </p>
                        <div className="pt-0.5">{user.securityQuestion}</div>
                    </div>

                    <div className="">
                        <p className="font-bold">
                            Answer
                        </p>
                        <div className="pt-0.5">{user.answer}</div>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <p className="font-bold">
                            Username
                        </p>
                        <div className="pt-0.5">{user.username}</div>
                    </div>

                    <div className="mt-4">
                        <p className="font-bold">
                            Password
                        </p>
                        <div className="pt-1">***********</div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center pt-5">
                <Button variant="outlined" size="large">
                    Edit
                </Button>
            </div>
        </Paper>
    </>
}