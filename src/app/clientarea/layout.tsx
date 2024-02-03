import Header from "@/components/layout/header/nav"
import { authOptions } from "@/libs/auth"
import { Paper } from "@mui/material";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import User from "../../../model/user";
import dbConnect from "@/libs/dbconnect";
import Script from "next/script";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions) as any

    await dbConnect()
    if (!session) {
        () => toast("Please Login to Continue");
        redirect('/login')
    }

    const user = await User.findById(session?.user.id)
    return (
        <Header props={session.user?.name} user={JSON.parse(JSON.stringify(user))}>
           
            {children}
            <ToastContainer />
        </Header>
    )
}