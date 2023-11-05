
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import AdminNavHeader from "./components/layout/adminnav";
import dbConnect from "@/libs/dbconnect";

export default async function AdminNav({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    await dbConnect()

    if (!session) {
        () => toast("Please Login to Continue");
        redirect('/login')
    }

    return (
        <AdminNavHeader>
            {children}
            <ToastContainer />
        </AdminNavHeader>
    )
}