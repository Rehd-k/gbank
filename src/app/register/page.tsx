import RegisterCom from "@/components/register/reg";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbconnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default async function Register() {
    await dbConnect()

    const session = await getServerSession(authOptions) as any


    if (session) {
        () => toast(`${session.user.name}, You are already logged in`);
        redirect('/clientarea/dashboard')
    }

    return (
        <>
            <RegisterCom />
        </>
    )
}