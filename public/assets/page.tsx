import Box from "@mui/material/Box";
import { redirect } from 'next/navigation'


export default function Home() {
  redirect('/clientarea/dashboard')
  return (
    <>
      <Box sx={{
        height: '100vh'
      }}>

      </Box>
    </>

  )
}
