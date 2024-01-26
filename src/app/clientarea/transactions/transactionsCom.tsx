'use client'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BalanceCards from "@/components/dashboard/balanceCard";



export default function TransactionComponent({ out, inArray, accounts }: any) {
    const [selected, setSelected] = useState(0)
    const [transToShow, settransToShow] = useState<any>([])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function checkContentsOfEvent(event: any) {
        setSelected(event)
    }

    const accountObject = JSON.parse(accounts)
    const outArray = JSON.parse(out)
    const inBArray = JSON.parse(inArray)
    const transactions = outArray.concat(inBArray)

    useEffect(() => {
        let smallArray: { from: any; }[] = []
        if (accountObject[selected]) {
            const AccountNumber = accountObject[selected].account_number
            transactions.map((res: { from: any; }) => {
                if (res.from == AccountNumber) {
                    smallArray.push(res)
                    console.log(res)
                }
            })
            settransToShow(smallArray.sort(sortByDateAsc))
        } else {
            settransToShow([])
        }
        

    }, [selected])

    function sortByDateAsc(a: any, b: any) {
        return Number(new Date(b.date)) - Number(new Date(a.date));
    }

    console.log(transToShow)



    return <>

        <div className="w-full pb-10">
            <Slider {...settings} afterChange={checkContentsOfEvent}>
                {accountObject.map((res: any, index: number) => {
                    return <BalanceCards key={index} props={res} />
                })}
            </Slider>
        </div>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Title
                        </TableCell>

                        <TableCell align="right">
                            Destination
                        </TableCell>

                        <TableCell align="right">
                            Amount
                        </TableCell>

                        <TableCell align="center">
                            Date
                        </TableCell>

                        <TableCell align="center">
                            Trans Id
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transToShow.map((row: any, index: number) => {
                        return <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell>
                                {row.title}
                            </TableCell>

                            <TableCell align="center">
                                {row.destination}
                            </TableCell>

                            <TableCell align="center">
                                {row.amount}
                            </TableCell>

                            <TableCell align="center">
                                {moment(row.date).format("MMM Do YY")}
                            </TableCell>

                            <TableCell align="center">
                                {row.trx_id}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </TableContainer>



    </>
}