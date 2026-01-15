averonAveronimport './globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dbConnect from '@/libs/dbconnect';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nebula Trust Bank',
  description: 'Nebula Trust Bank | Global Financial Institution'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await dbConnect()
  return (
    <html lang="en">
      
      <body className={inter.className}>

        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
