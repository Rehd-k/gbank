'use client'
import { Tabs, Tab, Typography, Box } from "@mui/material";
import React from "react";
import CreateTransaction from "./transactionscom/createTransaction";
import ViewTransaction from "./transactionscom/viewtransactions";

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

export default function TransactionsTabs({ usersList, transactionList }: any) {
    const [value, setValue] = React.useState(0);


    const users = JSON.parse(usersList)
    const transaction = JSON.parse(transactionList);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return <>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Create Transactions" />
            <Tab label="View Transactions" />
        </Tabs>

        <TabPanel value={value} index={0}>
            <CreateTransaction users={users} />
        </TabPanel>

        <TabPanel value={value} index={1}>
            <ViewTransaction transaction={transaction} />
        </TabPanel>
    </>
}