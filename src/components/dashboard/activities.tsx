'use client';

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect } from "react";
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import Activity from "./activity";
import { Box, Paper } from "@mui/material";
import Link from "next/link";
import { LockClockOutlined } from "@mui/icons-material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Activities({ inArray, out }: any) {
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const inArrayParse = JSON.parse(inArray);
    const outArray = JSON.parse(out);
    const allArray = inArrayParse.concat(outArray);

    const inA: any[] = []
    const outA: any[] = []
    const unapprovedA: any[] = []

    inArrayParse.map((res: any) => {
        if (res.approved) {
            inA.push(res)
        }

    })


    outArray.map((res: any) => {
        if (res.approved) {
            outA.push(res)
        }
    })

    allArray.map((res: any) => {
        if (!res.approved) {
            unapprovedA.push(res)
        }
    })

    outA.sort(sortByDateAsc);
    inA.sort(sortByDateAsc);
    allArray.sort(sortByDateAsc);
    unapprovedA.sort(sortByDateAsc);

    function sortByDateAsc(a: any, b: any) {
        return Number(new Date(b.date)) - Number(new Date(a.date));
    }


    return (
        <>
            <div className="bg-white">
                <div className="w-full h-16 bg-[#4f0d56]  text-gray-100 pl-5 mt-5 rounded-t-md flex items-center">
                    Recent Activity
                </div>
                <div className="px-1">
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab icon={<ListTwoToneIcon />} label="All" aria-label="All" />
                        <Tab icon={<FileDownloadTwoToneIcon />} label="Money In" aria-label="Inward" />
                        <Tab icon={<FileUploadTwoToneIcon />} label="Money Out" aria-label="OutWars" />
                        <Tab icon={<LockClockOutlined />} label="Pending" aria-label="Forward" />
                    </Tabs>



                    <TabPanel value={value} index={0}>
                        {
                            allArray.length < 1 ?
                                <Paper sx={{
                                    py: 10
                                }}>
                                    <div className="text-center">
                                        No Transaction .
                                    </div>
                                </Paper>
                                :
                                allArray.map((res: any, index: number) => {
                                    return <Activity transactions={res} key={index} />
                                })
                        }
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        {
                            inA.length < 1 ?

                                <Paper sx={{
                                    py: 10
                                }}>
                                    <div className="text-center">
                                        No Transaction .
                                    </div>
                                </Paper>
                                :
                                inA.map((res: any, index: number) => {
                                    return <Activity transactions={res} key={index} />
                                })

                        }
                    </TabPanel>


                    <TabPanel value={value} index={2}>
                        {
                            outA.length < 1 ?
                                <Paper sx={{
                                    py: 10
                                }}>
                                    <div className="text-center">
                                        No Transaction .
                                    </div>
                                </Paper>
                                :
                                outA.map((res: any, index: number) => {
                                    return <Activity transactions={res} key={index} />
                                })

                        }
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                        {
                            unapprovedA.length < 1 ?
                                <Paper sx={{
                                    py: 10
                                }}>
                                    <div className="text-center">
                                        No Transaction .
                                    </div>
                                </Paper>
                                :
                                unapprovedA.map((res: any, index: number) => {
                                    return <Activity transactions={res} key={index} />
                                })
                        }
                    </TabPanel>
                </div>
            </div >
        </>
    )
}