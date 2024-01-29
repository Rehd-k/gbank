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
            {/* <script type="text/javascript">
                var Tawk_API=Tawk_API||{ }, Tawk_LoadStart=new Date();
                (function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/65b7fddd8d261e1b5f593710/1hlbbfai7';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
})();
            </script> */}
            <Script
                strategy="lazyOnload"
                src="https://embed.tawk.to/65b7fddd8d261e1b5f593710/1hlbbfai7"
            />
            {children}
            <ToastContainer />
        </Header>
    )
}